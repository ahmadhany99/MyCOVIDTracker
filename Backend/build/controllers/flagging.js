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
const flaggingService = __importStar(require("../services/flagging"));
const NAMESPACE = 'Flagging';
/**
   * Executes the flagPatient function from services/flagging passing the flagging model
   * as parameter
   * Returns status of 200 if done successfully
   */
const flagPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Flag Patient');
    const flaggingDTO = req.body;
    try {
        yield flaggingService.flagPatient(flaggingDTO);
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "Patient Flagged."
        });
    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }
});
/**
   * Executes the unflagPatient function from services/flagging passing the flagging model
   * as parameter
   * Returns status of 200 if done successfully
   */
const unflagPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Unflag Patient');
    const flaggingDTO = req.body;
    try {
        yield flaggingService.unflagPatient(flaggingDTO);
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "Patient Unflagged."
        });
    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }
});
/**
   * Executes the getFlaggedPatients function from services/flagging passing the flagging model
   * as parameter
   * Returns status of 200 if done successfully
   */
const getFlaggedPatients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Get Flagged Patients');
    const flaggingDTO = req.body;
    try {
        const result = yield flaggingService.getFlaggedPatients(flaggingDTO);
        return res.json(result);
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "Flagged Patients Returned."
        });
    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.default = {
    flagPatient,
    getFlaggedPatients,
    unflagPatient
};
