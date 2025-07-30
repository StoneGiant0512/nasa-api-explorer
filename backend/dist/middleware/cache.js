"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheConfig = exports.clearCache = exports.cacheMiddleware = void 0;
class MemoryCache {
    constructor() {
        this.cache = new Map();
        this.defaultTTL = 5 * 60 * 1000;
    }
    set(key, data, ttl = this.defaultTTL) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl,
        });
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return null;
        const isExpired = Date.now() - entry.timestamp > entry.ttl;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }
        return entry.data;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now - entry.timestamp > entry.ttl) {
                this.cache.delete(key);
            }
        }
    }
}
const cache = new MemoryCache();
setInterval(() => cache.cleanup(), 10 * 60 * 1000);
const cacheMiddleware = (ttl = 5 * 60 * 1000) => {
    return (req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }
        if (req.query.noCache === 'true') {
            return next();
        }
        const cacheKey = `${req.originalUrl}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.json(cachedData);
        }
        const originalJson = res.json;
        res.json = function (data) {
            cache.set(cacheKey, data, ttl);
            return originalJson.call(this, data);
        };
        next();
    };
};
exports.cacheMiddleware = cacheMiddleware;
const clearCache = (pattern) => {
    if (pattern) {
        for (const key of cache['cache'].keys()) {
            if (key.includes(pattern)) {
                cache.delete(key);
            }
        }
    }
    else {
        cache.clear();
    }
};
exports.clearCache = clearCache;
exports.cacheConfig = {
    apod: 60 * 60 * 1000,
    marsRover: 30 * 60 * 1000,
    epic: 15 * 60 * 1000,
    neo: 10 * 60 * 1000,
    imageSearch: 5 * 60 * 1000,
    default: 5 * 60 * 1000,
};
//# sourceMappingURL=cache.js.map