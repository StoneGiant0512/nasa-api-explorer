"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const epicController_1 = require("../controllers/epicController");
const validation_1 = require("../middleware/validation");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)();
router.get('/', (0, validation_1.validateRequest)(validation_1.validationSchemas.epic), (0, cache_1.cacheMiddleware)(cache_1.cacheConfig.epic), epicController_1.EPICController.getEPICData);
router.get('/image-url', (0, validation_1.validateRequest)(validation_1.validationSchemas.epic), (0, cache_1.cacheMiddleware)(cache_1.cacheConfig.epic), epicController_1.EPICController.getEPICImageURL);
exports.default = router;
//# sourceMappingURL=epicRoutes.js.map