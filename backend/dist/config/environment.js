"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggingConfig = exports.getCacheConfig = exports.getRateLimitConfig = exports.getCORSConfig = exports.getServerConfig = exports.getNASAConfig = exports.isTest = exports.isProduction = exports.isDevelopment = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateConfig = () => {
    const defaultValues = {
        NASA_API_KEY: 'fn26y6c3iJUKPyilf8099ggmpCZQldWP8xTscwhw',
        NASA_API_BASE_URL: 'https://api.nasa.gov',
        CORS_ORIGIN: 'http://localhost:3000',
    };
    const missingVars = [];
    if (!process.env.NASA_API_KEY) {
        console.warn('⚠️  NASA_API_KEY not set, using DEMO_KEY (limited API access)');
    }
    if (!process.env.NASA_API_BASE_URL) {
        console.warn('⚠️  NASA_API_BASE_URL not set, using default NASA API URL');
    }
    if (!process.env.CORS_ORIGIN) {
        console.warn('⚠️  CORS_ORIGIN not set, using http://localhost:3000');
    }
    return {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: parseInt(process.env.PORT || '5000'),
        NASA_API_KEY: process.env.NASA_API_KEY || defaultValues.NASA_API_KEY,
        NASA_API_BASE_URL: process.env.NASA_API_BASE_URL || defaultValues.NASA_API_BASE_URL,
        CORS_ORIGIN: process.env.CORS_ORIGIN || defaultValues.CORS_ORIGIN,
        RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
        RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
        CACHE_ENABLED: process.env.CACHE_ENABLED !== 'false',
        CACHE_DEFAULT_TTL: parseInt(process.env.CACHE_DEFAULT_TTL || '300000'),
        LOG_LEVEL: process.env.LOG_LEVEL || 'info',
        LOG_REQUESTS: process.env.LOG_REQUESTS !== 'false',
    };
};
exports.config = validateConfig();
const isDevelopment = () => exports.config.NODE_ENV === 'development';
exports.isDevelopment = isDevelopment;
const isProduction = () => exports.config.NODE_ENV === 'production';
exports.isProduction = isProduction;
const isTest = () => exports.config.NODE_ENV === 'test';
exports.isTest = isTest;
const getNASAConfig = () => ({
    apiKey: exports.config.NASA_API_KEY,
    baseURL: exports.config.NASA_API_BASE_URL,
});
exports.getNASAConfig = getNASAConfig;
const getServerConfig = () => ({
    port: exports.config.PORT,
    nodeEnv: exports.config.NODE_ENV,
});
exports.getServerConfig = getServerConfig;
const getCORSConfig = () => ({
    origin: exports.config.CORS_ORIGIN,
});
exports.getCORSConfig = getCORSConfig;
const getRateLimitConfig = () => ({
    windowMs: exports.config.RATE_LIMIT_WINDOW_MS,
    max: exports.config.RATE_LIMIT_MAX_REQUESTS,
});
exports.getRateLimitConfig = getRateLimitConfig;
const getCacheConfig = () => ({
    enabled: exports.config.CACHE_ENABLED,
    defaultTTL: exports.config.CACHE_DEFAULT_TTL,
});
exports.getCacheConfig = getCacheConfig;
const getLoggingConfig = () => ({
    level: exports.config.LOG_LEVEL,
    logRequests: exports.config.LOG_REQUESTS,
});
exports.getLoggingConfig = getLoggingConfig;
//# sourceMappingURL=environment.js.map