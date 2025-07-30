"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentLogs = exports.getRequestStats = exports.morganFormat = exports.loggingMiddleware = exports.requestLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
class RequestLogger {
    constructor() {
        this.logs = [];
        this.maxLogs = 1000;
    }
    log(requestLog) {
        this.logs.push(requestLog);
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
        if (process.env.NODE_ENV === 'development') {
            console.log(`[${requestLog.timestamp}] ${requestLog.method} ${requestLog.url} - ${requestLog.statusCode} (${requestLog.responseTime}ms)`);
        }
    }
    getLogs(limit = 100) {
        return this.logs.slice(-limit);
    }
    getStats() {
        const statusCodes = {};
        const endpointCounts = {};
        let totalResponseTime = 0;
        this.logs.forEach(log => {
            statusCodes[log.statusCode] = (statusCodes[log.statusCode] || 0) + 1;
            endpointCounts[log.url] = (endpointCounts[log.url] || 0) + 1;
            totalResponseTime += log.responseTime;
        });
        const topEndpoints = Object.entries(endpointCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([url, count]) => ({ url, count }));
        return {
            totalRequests: this.logs.length,
            averageResponseTime: this.logs.length > 0 ? totalResponseTime / this.logs.length : 0,
            statusCodes,
            topEndpoints,
        };
    }
    clear() {
        this.logs = [];
    }
}
exports.requestLogger = new RequestLogger();
const loggingMiddleware = (req, res, next) => {
    const startTime = Date.now();
    const originalSend = res.send;
    const originalJson = res.json;
    res.send = function (data) {
        logRequest(req, res, startTime);
        return originalSend.call(this, data);
    };
    res.json = function (data) {
        logRequest(req, res, startTime);
        return originalJson.call(this, data);
    };
    next();
};
exports.loggingMiddleware = loggingMiddleware;
const logRequest = (req, res, startTime) => {
    const responseTime = Date.now() - startTime;
    const log = {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        responseTime,
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        timestamp: new Date().toISOString(),
        query: req.query,
        params: req.params,
        body: req.method !== 'GET' ? req.body : undefined,
    };
    exports.requestLogger.log(log);
};
exports.morganFormat = (0, morgan_1.default)((tokens, req, res) => {
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const status = tokens.status(req, res);
    const responseTime = tokens['response-time'](req, res);
    const contentLength = tokens.res(req, res, 'content-length');
    const userAgent = tokens['user-agent'](req, res);
    return `${method} ${url} ${status} ${responseTime}ms ${contentLength} - ${userAgent}`;
});
const getRequestStats = (req, res) => {
    const stats = exports.requestLogger.getStats();
    res.json({
        success: true,
        data: stats,
        message: 'Request statistics retrieved successfully',
        timestamp: new Date().toISOString(),
    });
};
exports.getRequestStats = getRequestStats;
const getRecentLogs = (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    const logs = exports.requestLogger.getLogs(limit);
    res.json({
        success: true,
        data: logs,
        message: 'Recent request logs retrieved successfully',
        timestamp: new Date().toISOString(),
    });
};
exports.getRecentLogs = getRecentLogs;
//# sourceMappingURL=logging.js.map