"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("../controllers/account"));
const router = express_1.default.Router();
router.post('/account/login', account_1.default.login);
router.post('/account/getAccount', account_1.default.getAccount);
router.get('/account/getAccount', account_1.default.getAccount);
router.post('/account/createAccount', account_1.default.register);
router.post('/account/deleteAccount', account_1.default.deleteAccount);
router.get('/account/getAllDoctors', account_1.default.getAllDoctors);
router.get('/account/getAllPatients', account_1.default.getAllPatients);
router.get('/account/createAccount', account_1.default.register);
router.get('/account/login', account_1.default.login);
module.exports = router;
