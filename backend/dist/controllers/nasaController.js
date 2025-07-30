"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NASAController = void 0;
const nasaService_1 = require("../services/nasaService");
class NASAController {
}
exports.NASAController = NASAController;
_a = NASAController;
NASAController.getAPOD = async (req, res) => {
    if (process.env.NODE_ENV === 'development') {
        console.log("APOD request params:", req.query);
    }
    try {
        const { date, start_date, end_date, count, thumbs } = req.query;
        const params = {
            ...(date && { date: date }),
            ...(start_date && { start_date: start_date }),
            ...(end_date && { end_date: end_date }),
            ...(count && { count: parseInt(count) }),
            ...(thumbs && { thumbs: thumbs === 'true' }),
        };
        const data = await nasaService_1.nasaService.getAPOD(Object.keys(params).length > 0 ? params : undefined);
        const response = {
            success: true,
            data,
            message: 'APOD data retrieved successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            error: 'APOD_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch APOD data',
            statusCode: 500,
            timestamp: new Date().toISOString(),
        };
        res.status(500).json(errorResponse);
    }
};
NASAController.getMarsRoverPhotos = async (req, res) => {
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
        const data = await nasaService_1.nasaService.getMarsRoverPhotos(rover, Object.keys(params).length > 0 ? params : undefined);
        const response = {
            success: true,
            data,
            message: `Mars rover photos for ${rover} retrieved successfully`,
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            error: 'MARS_ROVER_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch Mars rover photos',
            statusCode: 500,
            timestamp: new Date().toISOString(),
        };
        res.status(500).json(errorResponse);
    }
};
NASAController.getEPICData = async (req, res) => {
    try {
        const { date } = req.query;
        const data = await nasaService_1.nasaService.getEPICData(date);
        const response = {
            success: true,
            data,
            message: 'EPIC data retrieved successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            error: 'EPIC_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch EPIC data',
            statusCode: 500,
            timestamp: new Date().toISOString(),
        };
        res.status(500).json(errorResponse);
    }
};
NASAController.getNEOData = async (req, res) => {
    try {
        const { start_date, end_date, asteroid_id } = req.query;
        const params = {
            ...(start_date && { start_date: start_date }),
            ...(end_date && { end_date: end_date }),
            ...(asteroid_id && { asteroid_id: asteroid_id }),
        };
        const data = await nasaService_1.nasaService.getNEOData(Object.keys(params).length > 0 ? params : undefined);
        const response = {
            success: true,
            data,
            message: 'NEO data retrieved successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            error: 'NEO_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch NEO data',
            statusCode: 500,
            timestamp: new Date().toISOString(),
        };
        res.status(500).json(errorResponse);
    }
};
NASAController.searchNASAImages = async (req, res) => {
    try {
        const { q, center, description, keywords, location, nasa_id, photographer, title, year_start, year_end, media_type, page } = req.query;
        const params = {
            ...(q && { q: q }),
            ...(center && { center: center }),
            ...(description && { description: description }),
            ...(keywords && { keywords: keywords }),
            ...(location && { location: location }),
            ...(nasa_id && { nasa_id: nasa_id }),
            ...(photographer && { photographer: photographer }),
            ...(title && { title: title }),
            ...(year_start && { year_start: year_start }),
            ...(year_end && { year_end: year_end }),
            ...(media_type && { media_type: media_type }),
            ...(page && { page: parseInt(page) }),
        };
        const data = await nasaService_1.nasaService.searchNASAImages(Object.keys(params).length > 0 ? params : undefined);
        const response = {
            success: true,
            data,
            message: 'NASA images search completed successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            error: 'NASA_IMAGE_SEARCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to search NASA images',
            statusCode: 500,
            timestamp: new Date().toISOString(),
        };
        res.status(500).json(errorResponse);
    }
};
NASAController.getMarsRovers = async (req, res) => {
    try {
        const data = await nasaService_1.nasaService.getMarsRovers();
        const response = {
            success: true,
            data,
            message: 'Mars rovers data retrieved successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            error: 'MARS_ROVERS_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch Mars rovers data',
            statusCode: 500,
            timestamp: new Date().toISOString(),
        };
        res.status(500).json(errorResponse);
    }
};
NASAController.getMarsRoverManifest = async (req, res) => {
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
        const data = await nasaService_1.nasaService.getMarsRoverManifest(rover);
        const response = {
            success: true,
            data,
            message: `Mars rover manifest for ${rover} retrieved successfully`,
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            error: 'MARS_ROVER_MANIFEST_FETCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to fetch Mars rover manifest',
            statusCode: 500,
            timestamp: new Date().toISOString(),
        };
        res.status(500).json(errorResponse);
    }
};
NASAController.getEPICImageURL = async (req, res) => {
    try {
        const { identifier, date, image, enhanced } = req.query;
        if (!identifier || !date || !image) {
            res.status(400).json({
                error: 'MISSING_PARAMETERS',
                message: 'identifier, date, and image parameters are required',
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        const imageURL = enhanced === 'true'
            ? nasaService_1.nasaService.getEPICEnhancedImageURL(identifier, date, image)
            : nasaService_1.nasaService.getEPICImageURL(identifier, date, image);
        const response = {
            success: true,
            data: { imageURL },
            message: 'EPIC image URL generated successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            error: 'EPIC_IMAGE_URL_ERROR',
            message: error instanceof Error ? error.message : 'Failed to generate EPIC image URL',
            statusCode: 500,
            timestamp: new Date().toISOString(),
        };
        res.status(500).json(errorResponse);
    }
};
//# sourceMappingURL=nasaController.js.map