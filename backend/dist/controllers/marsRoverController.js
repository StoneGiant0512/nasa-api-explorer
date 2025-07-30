"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsRoverController = void 0;
const marsRoverService_1 = require("../services/marsRoverService");
class MarsRoverController {
}
exports.MarsRoverController = MarsRoverController;
_a = MarsRoverController;
MarsRoverController.getMarsRoverPhotos = async (req, res) => {
    try {
        const { rover } = req.params;
        const { sol, earth_date, camera, page } = req.query;
        if (!rover) {
            res.status(400).json({
                error: 'MISSING_ROVER',
                message: 'Rover parameter is required',
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        const params = {
            ...(sol && { sol: parseInt(sol) }),
            ...(earth_date && { earth_date: earth_date }),
            ...(camera && { camera: camera }),
            ...(page && { page: parseInt(page) }),
        };
        const validation = marsRoverService_1.marsRoverService.validateMarsRoverParams(params);
        if (!validation.isValid) {
            res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: `Mars Rover validation failed: ${validation.errors.join(', ')}`,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        const data = await marsRoverService_1.marsRoverService.getMarsRoverPhotos(rover, Object.keys(params).length > 0 ? params : undefined);
        const response = {
            success: true,
            data,
            message: `Mars rover photos for ${rover} retrieved successfully`,
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const statusCode = error instanceof Error && error.message.includes('NASA API') ? 502 : 500;
        const errorResponse = {
            error: 'MARS_ROVER_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch Mars rover photos',
            statusCode,
            timestamp: new Date().toISOString(),
        };
        res.status(statusCode).json(errorResponse);
    }
};
MarsRoverController.getMarsRovers = async (req, res) => {
    try {
        const data = await marsRoverService_1.marsRoverService.getMarsRovers();
        const response = {
            success: true,
            data,
            message: 'Mars rovers data retrieved successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const statusCode = error instanceof Error && error.message.includes('NASA API') ? 502 : 500;
        const errorResponse = {
            error: 'MARS_ROVERS_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch Mars rovers data',
            statusCode,
            timestamp: new Date().toISOString(),
        };
        res.status(statusCode).json(errorResponse);
    }
};
MarsRoverController.getMarsRoverManifest = async (req, res) => {
    try {
        const { rover } = req.params;
        if (!rover) {
            res.status(400).json({
                error: 'MISSING_ROVER',
                message: 'Rover parameter is required',
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        const data = await marsRoverService_1.marsRoverService.getMarsRoverManifest(rover);
        const response = {
            success: true,
            data,
            message: `Mars rover manifest for ${rover} retrieved successfully`,
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const statusCode = error instanceof Error && error.message.includes('NASA API') ? 502 : 500;
        const errorResponse = {
            error: 'MARS_ROVER_MANIFEST_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch Mars rover manifest',
            statusCode,
            timestamp: new Date().toISOString(),
        };
        res.status(statusCode).json(errorResponse);
    }
};
//# sourceMappingURL=marsRoverController.js.map