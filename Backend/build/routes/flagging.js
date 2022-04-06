"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const flagging_1 = __importDefault(require("../controllers/flagging"));
const router = express_1.default.Router();
router.post('/flag/flagPatient', flagging_1.default.flagPatient);
router.get('/flag/getFlaggedPatients', flagging_1.default.getFlaggedPatients);
router.post('/flag/getFlaggedPatients', flagging_1.default.getFlaggedPatients);
router.get('/flag/flagPatient', flagging_1.default.flagPatient);
module.exports = router;
