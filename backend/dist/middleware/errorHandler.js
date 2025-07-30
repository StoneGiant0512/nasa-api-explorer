"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errorResponse = {
        error: err.name || 'INTERNAL_SERVER_ERROR',
        message,
        statusCode,
        timestamp: new Date().toISOString(),
    };
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', {
            name: err.name,
            message: err.message,
            stack: err.stack,
            url: req.url,
            method: req.method,
            ip: req.ip,
        });
    }
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res, next) => {
    const errorResponse = {
        error: 'NOT_FOUND',
        message: `Route ${req.originalUrl} not found`,
        statusCode: 404,
        timestamp: new Date().toISOString(),
    };
    res.status(404).json(errorResponse);
};
exports.notFoundHandler = notFoundHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map