"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("./index");
const router = (0, express_1.Router)();
router.use('/apod', index_1.apodRoutes);
router.use('/mars-rovers', index_1.marsRoverRoutes);
router.use('/epic', index_1.epicRoutes);
router.use('/neo', index_1.neoRoutes);
router.use('/images', index_1.imageSearchRoutes);
exports.default = router;
//# sourceMappingURL=nasaRoutes.js.map