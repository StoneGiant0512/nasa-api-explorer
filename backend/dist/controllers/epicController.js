"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPICController = void 0;
const epicService_1 = require("../services/epicService");
class EPICController {
}
exports.EPICController = EPICController;
_a = EPICController;
EPICController.getEPICData = async (req, res) => {
    try {
        const { date } = req.query;
        const validation = epicService_1.epicService.validateEPICParams(date);
        if (!validation.isValid) {
            res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: `EPIC validation failed: ${validation.errors.join(', ')}`,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        const data = await epicService_1.epicService.getEPICData(date);
        const response = {
            success: true,
            data,
            message: 'EPIC data retrieved successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const statusCode = error instanceof Error && error.message.includes('NASA API') ? 502 : 500;
        const errorResponse = {
            error: 'EPIC_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch EPIC data',
            statusCode,
            timestamp: new Date().toISOString(),
        };
        res.status(statusCode).json(errorResponse);
    }
};
EPICController.getEPICImageURL = async (req, res) => {
    try {
        const { identifier, date, image, enhanced } = req.query;
        const params = {
            identifier: identifier,
            date: date,
            image: image,
            enhanced: enhanced === 'true'
        };
        const validation = epicService_1.epicService.validateEPICImageURLParams(params);
        if (!validation.isValid) {
            res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: `EPIC image URL validation failed: ${validation.errors.join(', ')}`,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        const imageURL = epicService_1.epicService.getEPICImageURLWithParams(params);
        const response = {
            success: true,
            data: { imageURL },
            message: 'EPIC image URL generated successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const statusCode = error instanceof Error && error.message.includes('NASA API') ? 502 : 500;
        const errorResponse = {
            error: 'EPIC_IMAGE_URL_ERROR',
            message: error instanceof Error ? error.message : 'Failed to generate EPIC image URL',
            statusCode,
            timestamp: new Date().toISOString(),
        };
        res.status(statusCode).json(errorResponse);
    }
};
//# sourceMappingURL=epicController.js.map