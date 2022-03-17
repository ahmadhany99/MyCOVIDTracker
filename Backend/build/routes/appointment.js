"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const appointment_1 = __importDefault(require("../controllers/appointment"));
const router = express_1.default.Router();
router.post('/appointment/createAppointment', appointment_1.default.createAppointment);
router.post('/appointment/updateAppointment', appointment_1.default.updateAppointment);
router.get('/appointment/getAppointments', appointment_1.default.getAppointments);
module.exports = router;
