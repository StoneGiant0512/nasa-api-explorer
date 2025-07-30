"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.epicService = exports.EPICService = void 0;
const axios_1 = __importDefault(require("axios"));
const environment_1 = require("../config/environment");
class EPICService {
    constructor() {
        this.apiKey = environment_1.config.NASA_API_KEY;
        this.baseURL = environment_1.config.NASA_API_BASE_URL;
        this.api = axios_1.default.create({
            baseURL: this.baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.api.interceptors.request.use((config) => {
            config.params = {
                ...config.params,
                api_key: this.apiKey,
            };
            return config;
        });
        this.api.interceptors.response.use((response) => response, (error) => {
            console.error('NASA EPIC API Error:', error.response?.data || error.message);
            throw error;
        });
    }
    async getEPICData(date) {
        try {
            const endpoint = date ? `/EPIC/api/natural/date/${date}` : '/EPIC/api/natural/latest';
            const response = await this.api.get(endpoint);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch EPIC data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getEPICByDate(date) {
        try {
            const response = await this.api.get(`/EPIC/api/natural/date/${date}`);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch EPIC data for date ${date}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getLatestEPIC() {
        try {
            const response = await this.api.get('/EPIC/api/natural/latest');
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch latest EPIC data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    getEPICImageURL(identifier, date, image) {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${this.baseURL}/EPIC/archive/natural/${year}/${month}/${day}/png/${image}.png?api_key=${this.apiKey}`;
    }
    getEPICEnhancedImageURL(identifier, date, image) {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${this.baseURL}/EPIC/archive/enhanced/${year}/${month}/${day}/png/${image}.png?api_key=${this.apiKey}`;
    }
    getEPICImageURLWithParams(params) {
        const { identifier, date, image, enhanced = false } = params;
        if (enhanced) {
            return this.getEPICEnhancedImageURL(identifier, date, image);
        }
        else {
            return this.getEPICImageURL(identifier, date, image);
        }
    }
    async getAvailableEPICDates() {
        try {
            const response = await this.api.get('/EPIC/api/natural/all');
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch available EPIC dates: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getEPICByDateRange(startDate, endDate) {
        try {
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (start > end) {
                throw new Error('Start date must be before end date');
            }
            const availableDates = await this.getAvailableEPICDates();
            const filteredDates = availableDates.filter(date => {
                const dateObj = new Date(date);
                return dateObj >= start && dateObj <= end;
            });
            const allData = [];
            for (const date of filteredDates) {
                try {
                    const data = await this.getEPICByDate(date);
                    allData.push(...data);
                }
                catch (error) {
                    console.warn(`Failed to fetch EPIC data for ${date}: ${error}`);
                }
            }
            return allData;
        }
        catch (error) {
            throw new Error(`Failed to fetch EPIC data for date range: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    validateEPICParams(date) {
        const errors = [];
        if (date) {
            const dateObj = new Date(date);
            if (isNaN(dateObj.getTime())) {
                errors.push('Invalid date format. Use YYYY-MM-DD');
            }
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    validateEPICImageURLParams(params) {
        const errors = [];
        if (!params.identifier) {
            errors.push('Identifier is required');
        }
        if (!params.date) {
            errors.push('Date is required');
        }
        else {
            const dateObj = new Date(params.date);
            if (isNaN(dateObj.getTime())) {
                errors.push('Invalid date format. Use YYYY-MM-DD');
            }
        }
        if (!params.image) {
            errors.push('Image name is required');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
exports.EPICService = EPICService;
exports.epicService = new EPICService();
//# sourceMappingURL=epicService.js.map