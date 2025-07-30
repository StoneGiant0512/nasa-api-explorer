"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apodService = exports.APODService = void 0;
const axios_1 = __importDefault(require("axios"));
const environment_1 = require("../config/environment");
class APODService {
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
            console.error('NASA APOD API Error:', error.response?.data || error.message);
            throw error;
        });
    }
    async getAPOD(params) {
        try {
            const response = await this.api.get('/planetary/apod', {
                params
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch APOD: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getAPODByDate(date) {
        try {
            const response = await this.api.get('/planetary/apod', {
                params: { date }
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch APOD for date ${date}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getAPODByDateRange(startDate, endDate) {
        try {
            const response = await this.api.get('/planetary/apod', {
                params: { start_date: startDate, end_date: endDate }
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch APOD for date range ${startDate} to ${endDate}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getAPODByCount(count) {
        try {
            const response = await this.api.get('/planetary/apod', {
                params: { count }
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch ${count} APOD images: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    validateAPODParams(params) {
        const errors = [];
        if (params.date) {
            const date = new Date(params.date);
            if (isNaN(date.getTime())) {
                errors.push('Invalid date format. Use YYYY-MM-DD');
            }
        }
        if (params.start_date && params.end_date) {
            const start = new Date(params.start_date);
            const end = new Date(params.end_date);
            if (start > end) {
                errors.push('Start date must be before end date');
            }
        }
        if (params.count && (params.count < 1 || params.count > 100)) {
            errors.push('Count must be between 1 and 100');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
exports.APODService = APODService;
exports.apodService = new APODService();
//# sourceMappingURL=apodService.js.map