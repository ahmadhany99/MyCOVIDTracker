"use strict";
/**
 * @fileoverview
 * Routes for the quarantine feature
 * @package
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const quarantine_1 = __importDefault(require("../controllers/quarantine"));
const router = express_1.default.Router();
router.post('/quarantine/inputStartTime', quarantine_1.default.inputStartTime);
router.post('/quarantine/daysLeft', quarantine_1.default.calculateDaysLeft);
router.get('/quarantine/getRemainingDays', quarantine_1.default.getRemainingDays);
module.exports = router;
