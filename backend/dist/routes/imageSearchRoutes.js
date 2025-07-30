"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageSearchController_1 = require("../controllers/imageSearchController");
const validation_1 = require("../middleware/validation");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)();
router.get('/', (0, validation_1.validateRequest)(validation_1.validationSchemas.imageSearch), (0, cache_1.cacheMiddleware)(cache_1.cacheConfig.imageSearch), imageSearchController_1.ImageSearchController.searchNASAImages);
exports.default = router;
//# sourceMappingURL=imageSearchRoutes.js.map