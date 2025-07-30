"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.APODController = void 0;
const apodService_1 = require("../services/apodService");
class APODController {
}
exports.APODController = APODController;
_a = APODController;
APODController.getAPOD = async (req, res) => {
    try {
        const { date, start_date, end_date, count, thumbs } = req.query;
        const params = {
            ...(date && { date: date }),
            ...(start_date && { start_date: start_date }),
            ...(end_date && { end_date: end_date }),
            ...(count && { count: parseInt(count) }),
            ...(thumbs && { thumbs: thumbs === 'true' }),
        };
        const validation = apodService_1.apodService.validateAPODParams(params);
        if (!validation.isValid) {
            res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: `APOD validation failed: ${validation.errors.join(', ')}`,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        const data = await apodService_1.apodService.getAPOD(Object.keys(params).length > 0 ? params : undefined);
        const response = {
            success: true,
            data,
            message: 'APOD data retrieved successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const statusCode = error instanceof Error && error.message.includes('NASA API') ? 502 : 500;
        const errorResponse = {
            error: 'APOD_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch APOD data',
            statusCode,
            timestamp: new Date().toISOString(),
        };
        res.status(statusCode).json(errorResponse);
    }
};
//# sourceMappingURL=apodController.js.map