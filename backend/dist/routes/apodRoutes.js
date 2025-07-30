"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apodController_1 = require("../controllers/apodController");
const validation_1 = require("../middleware/validation");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)();
router.get('/', (0, validation_1.validateRequest)(validation_1.validationSchemas.apod), (0, cache_1.cacheMiddleware)(cache_1.cacheConfig.apod), apodController_1.APODController.getAPOD);
exports.default = router;
//# sourceMappingURL=apodRoutes.js.map