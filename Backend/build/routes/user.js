"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.get('/validate', user_1.default.validateToken);
router.post('/register', user_1.default.register);
router.post('/login', user_1.default.login);
router.get('/getAllUsers', user_1.default.getAllUsers);
module.exports = router;
