"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const environment_1 = require("./config/environment");
const cors_1 = require("./middleware/cors");
const errorHandler_1 = require("./middleware/errorHandler");
const logging_1 = require("./middleware/logging");
const nasaRoutes_1 = __importDefault(require("./routes/nasaRoutes"));
const docsRoutes_1 = __importDefault(require("./routes/docsRoutes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(cors_1.corsMiddleware);
app.use((0, compression_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: environment_1.config.RATE_LIMIT_WINDOW_MS,
    max: environment_1.config.RATE_LIMIT_MAX_REQUESTS,
    message: {
        error: 'TOO_MANY_REQUESTS',
        message: 'Too many requests from this IP, please try again later.',
        statusCode: 429,
        timestamp: new Date().toISOString(),
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
app.use(logging_1.loggingMiddleware);
if ((0, environment_1.isDevelopment)()) {
    app.use(logging_1.morganFormat);
}
else {
    app.use((0, morgan_1.default)('combined'));
}
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
    });
});
app.use('/api/nasa', nasaRoutes_1.default);
app.use('/api/docs', docsRoutes_1.default);
app.get('/', (req, res) => {
    res.json({
        message: 'NASA Data Explorer API',
        version: '1.0.0',
        endpoints: {
            apod: '/api/nasa/apod',
            marsRovers: '/api/nasa/mars-rovers',
            marsRoverPhotos: '/api/nasa/mars-rovers/:rover/photos',
            epic: '/api/nasa/epic',
            neo: '/api/nasa/neo',
            images: '/api/nasa/images',
            docs: '/api/docs',
        },
        documentation: 'https://api.nasa.gov/',
        features: [
            'Input validation',
            'Response caching',
            'Request logging',
            'Rate limiting',
            'API monitoring',
        ],
    });
});
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map