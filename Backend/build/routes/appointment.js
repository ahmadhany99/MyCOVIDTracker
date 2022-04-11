"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const appointment_1 = __importDefault(require("../controllers/appointment"));
const router = express_1.default.Router();
router.post('/appointment/create', appointment_1.default.createAppointment);
router.post('/appointment/update', appointment_1.default.updateAppointment);
router.put('/appointment/get', appointment_1.default.getAppointments);
module.exports = router;
