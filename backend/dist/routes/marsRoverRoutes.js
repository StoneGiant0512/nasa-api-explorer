"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marsRoverController_1 = require("../controllers/marsRoverController");
const validation_1 = require("../middleware/validation");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)();
router.get('/', (0, cache_1.cacheMiddleware)(cache_1.cacheConfig.marsRover), marsRoverController_1.MarsRoverController.getMarsRovers);
router.get('/:rover/photos', (0, validation_1.validateRequest)(validation_1.validationSchemas.marsRover), (0, cache_1.cacheMiddleware)(cache_1.cacheConfig.marsRover), marsRoverController_1.MarsRoverController.getMarsRoverPhotos);
router.get('/:rover/manifest', (0, validation_1.validateRequest)(validation_1.validationSchemas.marsRover), (0, cache_1.cacheMiddleware)(cache_1.cacheConfig.marsRover), marsRoverController_1.MarsRoverController.getMarsRoverManifest);
exports.default = router;
//# sourceMappingURL=marsRoverRoutes.js.map