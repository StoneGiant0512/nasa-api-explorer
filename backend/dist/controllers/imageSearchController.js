"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSearchController = void 0;
const imageSearchService_1 = require("../services/imageSearchService");
class ImageSearchController {
}
exports.ImageSearchController = ImageSearchController;
_a = ImageSearchController;
ImageSearchController.searchNASAImages = async (req, res) => {
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
        const validation = imageSearchService_1.imageSearchService.validateImageSearchParams(params);
        if (!validation.isValid) {
            res.status(400).json({
                error: 'VALIDATION_ERROR',
                message: `Image search validation failed: ${validation.errors.join(', ')}`,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        const data = await imageSearchService_1.imageSearchService.searchNASAImages(Object.keys(params).length > 0 ? params : undefined);
        const response = {
            success: true,
            data,
            message: 'NASA images search completed successfully',
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    }
    catch (error) {
        const statusCode = error instanceof Error && error.message.includes('NASA API') ? 502 : 500;
        const errorResponse = {
            error: 'NASA_IMAGE_SEARCH_ERROR',
            message: error instanceof Error ? error.message : 'Failed to search NASA images',
            statusCode,
            timestamp: new Date().toISOString(),
        };
        res.status(statusCode).json(errorResponse);
    }
};
//# sourceMappingURL=imageSearchController.js.map