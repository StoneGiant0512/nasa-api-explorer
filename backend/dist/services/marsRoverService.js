"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marsRoverService = exports.MarsRoverService = void 0;
const axios_1 = __importDefault(require("axios"));
const environment_1 = require("../config/environment");
class MarsRoverService {
    constructor() {
        this.validRovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];
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
            console.error('NASA Mars Rover API Error:', error.response?.data || error.message);
            throw error;
        });
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
    async getMarsRoverPhotos(rover, params) {
        try {
            this.validateRover(rover);
            const response = await this.api.get(`/mars-photos/api/v1/rovers/${rover}/photos`, {
                params,
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch Mars Rover photos for ${rover}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getMarsRoverManifest(rover) {
        try {
            this.validateRover(rover);
            const response = await this.api.get(`/mars-photos/api/v1/manifests/${rover}`);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch Mars Rover manifest for ${rover}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getPhotosBySol(rover, sol, camera) {
        try {
            this.validateRover(rover);
            const params = { sol };
            if (camera) {
                params.camera = camera;
            }
            return await this.getMarsRoverPhotos(rover, params);
        }
        catch (error) {
            throw new Error(`Failed to fetch photos for ${rover} on sol ${sol}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getPhotosByEarthDate(rover, earthDate, camera) {
        try {
            this.validateRover(rover);
            const params = { earth_date: earthDate };
            if (camera) {
                params.camera = camera;
            }
            return await this.getMarsRoverPhotos(rover, params);
        }
        catch (error) {
            throw new Error(`Failed to fetch photos for ${rover} on Earth date ${earthDate}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getRoverInfo(rover) {
        try {
            this.validateRover(rover);
            const roversResponse = await this.getMarsRovers();
            const roverInfo = roversResponse.rovers.find(r => r.name.toLowerCase() === rover.toLowerCase());
            if (!roverInfo) {
                throw new Error(`Rover ${rover} not found`);
            }
            return roverInfo;
        }
        catch (error) {
            throw new Error(`Failed to get rover info for ${rover}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    validateRover(rover) {
        if (!this.validRovers.includes(rover.toLowerCase())) {
            throw new Error(`Invalid rover name. Must be one of: ${this.validRovers.join(', ')}`);
        }
    }
    validateMarsRoverParams(params) {
        const errors = [];
        if (params.sol !== undefined && (params.sol < 0 || !Number.isInteger(params.sol))) {
            errors.push('Sol must be a non-negative integer');
        }
        if (params.earth_date) {
            const date = new Date(params.earth_date);
            if (isNaN(date.getTime())) {
                errors.push('Invalid Earth date format. Use YYYY-MM-DD');
            }
        }
        if (params.page !== undefined && (params.page < 1 || !Number.isInteger(params.page))) {
            errors.push('Page must be a positive integer');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    async getRoverCameras(rover) {
        try {
            const roverInfo = await this.getRoverInfo(rover);
            return roverInfo.cameras.map(camera => camera.name);
        }
        catch (error) {
            throw new Error(`Failed to get cameras for ${rover}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
exports.MarsRoverService = MarsRoverService;
exports.marsRoverService = new MarsRoverService();
//# sourceMappingURL=marsRoverService.js.map