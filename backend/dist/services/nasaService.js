"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nasaService = exports.NASAService = void 0;
const axios_1 = __importDefault(require("axios"));
const environment_1 = require("../config/environment");
class NASAService {
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
            console.error('NASA API Error:', error.response?.data || error.message);
            throw error;
        });
    }
    async getAPOD(params) {
        try {
            console.log("params", params);
            const response = await this.api.get('/planetary/apod', {
                params
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch APOD: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getMarsRoverPhotos(rover, params) {
        try {
            const response = await this.api.get(`/mars-photos/api/v1/rovers/${rover}/photos`, {
                params,
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch Mars Rover photos: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
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
    async getNEOData(params) {
        try {
            const response = await this.api.get('/neo/rest/v1/feed', {
                params,
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch NEO data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async searchNASAImages(params) {
        try {
            const response = await this.api.get('/search', {
                params: {
                    ...params,
                    media_type: params?.media_type || 'image',
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to search NASA images: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getMarsRovers() {
        try {
            const response = await this.api.get('/mars-photos/api/v1/rovers');
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch Mars rovers: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getMarsRoverManifest(rover) {
        try {
            const response = await this.api.get(`/mars-photos/api/v1/manifests/${rover}`);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch Mars rover manifest: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
}
exports.NASAService = NASAService;
exports.nasaService = new NASAService();
//# sourceMappingURL=nasaService.js.map