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
router.post('/quarantine/set/start', quarantine_1.default.inputStartDate);
router.post('/quarantine/set/end', quarantine_1.default.inputEndDate);
router.get('/quarantine/getRemainingDays', quarantine_1.default.getRemainingDays);
// #TODO maybe put this route in patient?
router.get('/quarantine/setQuarantineTrue', quarantine_1.default.setQuarantineTrue);
module.exports = router;
