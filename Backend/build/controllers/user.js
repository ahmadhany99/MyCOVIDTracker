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
const userService = __importStar(require("../services/user"));
const NAMESPACE = 'User';
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Token validated, user authorized.");
    return res.status(200).json({
        message: "Authorized"
    });
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    logging_1.default.info(NAMESPACE, 'Creating user.');
    //  Data Transfer Object (DTO)
    const userDTO = req.body;
    //  Todo: Insert middleware isUserValid = validators.user(reqBody) instead of following
    try {
        if (!userDTO.firstName || !userDTO.lastName) {
            return res.status(400).json({
                status: 400,
                message: "Missing username or password"
            });
        }
        //  Call to service layer
        const result = yield userService.register(userDTO);
        // Return a response to client.
        return res.json(user);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting all samples.');
    //  Call to service layer
    const result = yield userService.retrieveSample();
    // Return a response to client.
    return res.json(result);
});
exports.default = { validateToken, register, login, getAllUsers };
