"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const neoController_1 = require("../controllers/neoController");
const validation_1 = require("../middleware/validation");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)();
router.get('/', (0, validation_1.validateRequest)(validation_1.validationSchemas.neo), (0, cache_1.cacheMiddleware)(cache_1.cacheConfig.neo), neoController_1.NEOController.getNEOData);
exports.default = router;
//# sourceMappingURL=neoRoutes.js.map