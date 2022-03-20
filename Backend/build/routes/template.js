"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const template_1 = __importDefault(require("../controllers/template"));
const router = express_1.default.Router();
router.get('/validate', template_1.default.validateToken);
router.post('/register', template_1.default.register);
router.post('/login', template_1.default.login);
router.get('/getAllUsers', template_1.default.getAllUsers);
module.exports = router;
