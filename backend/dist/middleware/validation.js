"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchemas = exports.validateRequest = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.isOperational = true;
    }
}
exports.ValidationError = ValidationError;
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            const errors = [];
            if (schema.query) {
                validateFields(req.query, schema.query, errors, 'query');
            }
            if (schema.params) {
                validateFields(req.params, schema.params, errors, 'params');
            }
            if (schema.body) {
                validateFields(req.body, schema.body, errors, 'body');
            }
            if (errors.length > 0) {
                const errorResponse = {
                    error: 'VALIDATION_ERROR',
                    message: `Validation failed: ${errors.join(', ')}`,
                    statusCode: 400,
                    timestamp: new Date().toISOString(),
                };
                res.status(400).json(errorResponse);
                return;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validateRequest = validateRequest;
const validateFields = (data, rules, errors, source) => {
    for (const rule of rules) {
        const value = data[rule.field];
        if (rule.required && (value === undefined || value === null || value === '')) {
            errors.push(`${source}.${rule.field} is required`);
            continue;
        }
        if (value === undefined || value === null) {
            continue;
        }
        if (rule.type === 'number') {
            const numValue = Number(value);
            if (isNaN(numValue)) {
                errors.push(`${source}.${rule.field} must be a number`);
                continue;
            }
            if (rule.min !== undefined && numValue < rule.min) {
                errors.push(`${source}.${rule.field} must be at least ${rule.min}`);
            }
            if (rule.max !== undefined && numValue > rule.max) {
                errors.push(`${source}.${rule.field} must be at most ${rule.max}`);
            }
        }
        else if (rule.type === 'boolean') {
            if (typeof value !== 'boolean' && value !== 'true' && value !== 'false') {
                errors.push(`${source}.${rule.field} must be a boolean`);
            }
        }
        else if (rule.type === 'date') {
            const dateValue = new Date(value);
            if (isNaN(dateValue.getTime())) {
                errors.push(`${source}.${rule.field} must be a valid date`);
            }
        }
        else if (rule.type === 'string') {
            if (typeof value !== 'string') {
                errors.push(`${source}.${rule.field} must be a string`);
                continue;
            }
            if (rule.min !== undefined && value.length < rule.min) {
                errors.push(`${source}.${rule.field} must be at least ${rule.min} characters`);
            }
            if (rule.max !== undefined && value.length > rule.max) {
                errors.push(`${source}.${rule.field} must be at most ${rule.max} characters`);
            }
            if (rule.pattern && !rule.pattern.test(value)) {
                errors.push(`${source}.${rule.field} format is invalid`);
            }
            if (rule.enum && !rule.enum.includes(value)) {
                errors.push(`${source}.${rule.field} must be one of: ${rule.enum.join(', ')}`);
            }
        }
        if (rule.transform) {
            data[rule.field] = rule.transform(value);
        }
    }
};
exports.validationSchemas = {
    apod: {
        query: [
            { field: 'date', type: 'date', required: false },
            { field: 'start_date', type: 'date', required: false },
            { field: 'end_date', type: 'date', required: false },
            { field: 'count', type: 'number', required: false, min: 1, max: 100 },
            { field: 'thumbs', type: 'boolean', required: false },
        ],
    },
    marsRover: {
        params: [
            { field: 'rover', type: 'string', required: true, enum: ['curiosity', 'opportunity', 'spirit', 'perseverance'] },
        ],
        query: [
            { field: 'sol', type: 'number', required: false, min: 0 },
            { field: 'earth_date', type: 'date', required: false },
            { field: 'camera', type: 'string', required: false },
            { field: 'page', type: 'number', required: false, min: 1 },
        ],
    },
    epic: {
        query: [
            { field: 'date', type: 'date', required: false },
            { field: 'identifier', type: 'string', required: false },
            { field: 'image', type: 'string', required: false },
            { field: 'enhanced', type: 'boolean', required: false },
        ],
    },
    neo: {
        query: [
            { field: 'start_date', type: 'date', required: false },
            { field: 'end_date', type: 'date', required: false },
            { field: 'asteroid_id', type: 'string', required: false },
        ],
    },
    imageSearch: {
        query: [
            { field: 'q', type: 'string', required: false, max: 200 },
            { field: 'center', type: 'string', required: false },
            { field: 'description', type: 'string', required: false, max: 500 },
            { field: 'keywords', type: 'string', required: false, max: 200 },
            { field: 'location', type: 'string', required: false },
            { field: 'nasa_id', type: 'string', required: false },
            { field: 'photographer', type: 'string', required: false },
            { field: 'title', type: 'string', required: false, max: 200 },
            { field: 'year_start', type: 'number', required: false, min: 1900, max: new Date().getFullYear() },
            { field: 'year_end', type: 'number', required: false, min: 1900, max: new Date().getFullYear() },
            { field: 'media_type', type: 'string', required: false, enum: ['image', 'video', 'audio'] },
            { field: 'page', type: 'number', required: false, min: 1 },
        ],
    },
};
//# sourceMappingURL=validation.js.map