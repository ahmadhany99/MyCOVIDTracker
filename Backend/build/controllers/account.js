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
const NAMESPACE = 'Account';
const createAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Create account");
    //  Data Transfer Object (DTO)
    const accountDTO = req.body;
    try {
        //  Call to service layer
        const result = yield accountService.create(accountDTO);
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "Account Created."
        });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Login to account.');
    //  Data Transfer Object (DTO)
    const accountDTO = req.body;
    //  Todo: Insert middleware isUserValid = validators.user(reqBody) instead of following
    try {
        if (!accountDTO.username || !accountDTO.password) {
            return res.status(400).json({
                status: 400,
                message: "Missing username or password"
            });
        }
        //  Call to service layer
        const result = yield accountService.login(accountDTO);
        // Return a response to client.
        return res.json(result);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
const getAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Retrieving Account from Database');
    //  Data Transfer Object (DTO)
    const accountDTO = req.body;
    try {
        //  Call to service layer
        const result = yield accountService.getAccount(accountDTO);
        // Return a response to client.
        return res.json(result);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
const getAllDoctors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Retrieving Account from Database');
    try {
        //  Call to service layer
        const result = yield accountService.getAllDoctors();
        // Return a response to client.
        return res.json(result);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
const deleteAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Deleting Account');
    const accountDTO = req.body;
    try {
        const result = yield accountService.deleteAccount(accountDTO);
        return res.json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.default = {
    createAccount,
    login,
    getAccount,
    deleteAccount,
    getAllDoctors
};
