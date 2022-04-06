"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const status_1 = __importDefault(require("../controllers/status"));
const router = express_1.default.Router();
router.post('/status/update', status_1.default.updateStatus);
router.get('/status/get', status_1.default.getStatus);
router.put('/status/get', status_1.default.getStatus);
router.get('/status/get/all', status_1.default.getAllStatus);
router.get('/status/get/all/user', status_1.default.getStatusByPatient);
router.put('/status/get/all/user', status_1.default.getStatusByPatient);
router.get('/status/get/all/date', status_1.default.getStatusByDate);
router.put('/status/get/all/date', status_1.default.getStatusByDate);
router.delete('/status/delete', status_1.default.deleteStatus);
module.exports = router;
