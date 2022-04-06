"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const accountService = __importStar(require("../services/account"));
const NAMESPACE = 'account/controller';
function handleAccountError(err, res) {
    if (err.message == "email is null") {
        return res.status(400).json({
            status: 400,
            message: "Email needs to be assigned a value"
        });
    }
    else if (err.message == "password is null") {
        return res.status(400).json({
            status: 400,
            message: "Password needs to be assigned a value"
        });
    }
    else if (err.message == "type is null") {
        return res.status(400).json({
            status: 400,
            message: "User type needs to be assigned a value"
        });
    }
    else if (err.message == "account is not admin") {
        return res.status(403).json({
            status: 404,
            message: "You do not have permission to access this ressource"
        });
    }
    else if (err.message == "account does not exist") {
        return res.status(404).json({
            status: 404,
            message: "There is no existing account associated to this email"
        });
    }
    else if (err.message == "account exist") {
        return res.status(409).json({
            status: 409,
            message: "An account using this email already exists"
        });
    }
    else {
        return res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}
const registerClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Create account');
    // cast request body as account model
    const accountDTO = req.body;
    try {
        //  Call to service layer
        yield accountService.createAccount(accountDTO);
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "Account created successfully"
        });
    }
    catch (e) {
        const err = e;
        logging_1.default.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
});
const loginClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Login to account.');
    // cast request body as account model
    const accountDTO = req.body;
    try {
        //  Call to service layer
        const result = yield accountService.loginAccount(accountDTO);
        // Return a response to client.
        if (result) {
            return res.status(200).json({
                status: 200,
                message: "login successful",
            });
        }
        else {
            return res.status(403).json({
                status: 403,
                message: "login failed, wrong username or password"
            });
        }
    }
    catch (e) {
        const err = e;
        logging_1.default.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
});
const registerAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Create account');
    // cast request body as account model
    const accountDTO = req.body;
    try {
        //  Call to service layer
        yield accountService.createAccountAdmin(accountDTO);
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "Account created successfully"
        });
    }
    catch (e) {
        const err = e;
        logging_1.default.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
});
const loginAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Login to account.');
    // cast request body as account model
    const accountDTO = req.body;
    try {
        //  Call to service layer
        const result = yield accountService.loginAccountAdmin(accountDTO);
        // Return a response to client.
        if (result) {
            return res.status(200).json({
                status: 200,
                message: "login successful",
            });
        }
        else {
            return res.status(403).json({
                status: 403,
                message: "login failed, wrong username or password"
            });
        }
    }
    catch (e) {
        const err = e;
        logging_1.default.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
});
const getAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Retrieving Account from Database');
    // cast request body as account model
    const accountDTO = req.body;
    try {
        //  Call to service layer
        const result = yield accountService.getAccount(accountDTO);
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: result
        });
    }
    catch (e) {
        const err = e;
        logging_1.default.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
});
const deleteAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Deleting Account from Database');
    const accountDTO = req.body;
    try {
        //  Call to service layer
        yield accountService.deleteAccount(accountDTO);
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: "Account has been deleted"
        });
    }
    catch (e) {
        const err = e;
        logging_1.default.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
});
const getPatients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Get Doctor Accounts From Account Table');
    try {
        //  Call to service layer
        const result = yield accountService.getPatientAccounts();
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: result
        });
    }
    catch (e) {
        const err = e;
        logging_1.default.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
});
const getDoctors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Get Doctor Accounts From Account Table');
    try {
        //  Call to service layer
        const result = yield accountService.getDoctorAccounts();
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: result
        });
    }
    catch (e) {
        const err = e;
        logging_1.default.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
});
exports.default = {
    registerClient,
    loginClient,
    registerAdmin,
    loginAdmin,
    getAccount,
    deleteAccount,
    getPatients,
    getDoctors
};
