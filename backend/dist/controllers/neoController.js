"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEOController = void 0;
const neoService_1 = require("../services/neoService");
class NEOController {
}
exports.NEOController = NEOController;
_a = NEOController;
NEOController.getNEOData = async (req, res) => {
    try {
        const { start_date, end_date, asteroid_id } = req.query;
        const params = {
            ...(start_date && { start_date: start_date }),
            ...(end_date && { end_date: end_date }),
            ...(asteroid_id && { asteroid_id: asteroid_id }),
        };
        const validation = neoService_1.neoService.validateNEOParams(params);
        if (!validation.isValid) {
            res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: `NEO validation failed: ${validation.errors.join(', ')}`,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        const data = await neoService_1.neoService.getNEOData(Object.keys(params).length > 0 ? params : undefined);
        const response = {
            success: true,
            data,
            message: 'NEO data retrieved successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const statusCode = error instanceof Error && error.message.includes('NASA API') ? 502 : 500;
        const errorResponse = {
            error: 'NEO_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch NEO data',
            statusCode,
            timestamp: new Date().toISOString(),
        };
        res.status(statusCode).json(errorResponse);
    }
};
//# sourceMappingURL=neoController.js.map