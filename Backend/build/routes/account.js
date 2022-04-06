"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("../controllers/account"));
const router = express_1.default.Router();
router.put('/account/login', account_1.default.loginClient);
router.put('/admin/login', account_1.default.loginAdmin);
router.post('/account/register', account_1.default.registerClient);
router.post('/admin/register', account_1.default.registerAdmin);
//plz test and choose only one to use between get/put
router.get('/account/get', account_1.default.getAccount);
router.put('/account/get', account_1.default.getAccount);
router.get('/account/get/patient', account_1.default.getPatients);
router.delete('/account/delete', account_1.default.deleteAccount);
module.exports = router;
