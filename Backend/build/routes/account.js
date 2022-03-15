"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("../controllers/account"));
const router = express_1.default.Router();
router.get('/account/login', account_1.default.login);
router.get('/account/getAccount', account_1.default.getAccount);
router.post('/account/createAccount', account_1.default.createAccount);
router.post('/account/deleteAccount', account_1.default.deleteAccount);
router.get('/account/getAllDoctors', account_1.default.getAllDoctors);
module.exports = router;
