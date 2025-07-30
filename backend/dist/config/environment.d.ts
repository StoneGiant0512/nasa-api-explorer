interface EnvironmentConfig {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: number;
    NASA_API_KEY: string;
    NASA_API_BASE_URL: string;
    CORS_ORIGIN: string;
    RATE_LIMIT_WINDOW_MS: number;
    RATE_LIMIT_MAX_REQUESTS: number;
    CACHE_ENABLED: boolean;
    CACHE_DEFAULT_TTL: number;
    LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug';
    LOG_REQUESTS: boolean;
}
export declare const config: EnvironmentConfig;
export declare const isDevelopment: () => boolean;
export declare const isProduction: () => boolean;
export declare const isTest: () => boolean;
export declare const getNASAConfig: () => {
    apiKey: string;
    baseURL: string;
};
export declare const getServerConfig: () => {
    port: number;
    nodeEnv: "development" | "production" | "test";
};
export declare const getCORSConfig: () => {
    origin: string;
};
export declare const getRateLimitConfig: () => {
    windowMs: number;
    max: number;
};
export declare const getCacheConfig: () => {
    enabled: boolean;
    defaultTTL: number;
};
export declare const getLoggingConfig: () => {
    level: "error" | "warn" | "info" | "debug";
    logRequests: boolean;
};
export {};
//# sourceMappingURL=environment.d.ts.map