"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const status_1 = __importDefault(require("../controllers/status"));
const router = express_1.default.Router();
// update patient's status args: uid, date, report
router.post('/status/updateStatus', status_1.default.updateStatus);
// delete status args: uid, date
router.post('/status/deleteStatus', status_1.default.deleteStatus);
// get unique status args: uid, date
router.get('/status/getStatus', status_1.default.getStatus);
// gets all status for user args: uid
router.get('/status/getAllStatus', status_1.default.getAllStatus);
module.exports = router;
