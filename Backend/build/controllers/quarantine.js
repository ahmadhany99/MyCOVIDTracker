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
const quarantineService = __importStar(require("../services/quarantine"));
const NAMESPACE = 'Quarantine';
/**
   * Executes the inputStartTime function from services/quarantine passing the quarantine model
   * as parameter
   * Returns status of 200 if done successfully
   */
const inputStartDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Entering Start Time');
    const quarantineDTO = req.body;
    try {
        yield quarantineService.inputStartDate(quarantineDTO);
        //Return a response to the client.
        return res.status(200).json({
            status: 200,
            message: "Start date time has been entered successfully"
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const inputEndDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Entering Start Time');
    const quarantineDTO = req.body;
    try {
        yield quarantineService.inputEndDate(quarantineDTO);
        //Return a response to the client.
        return res.status(200).json({
            status: 200,
            message: "Start date time has been entered successfully"
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
/**
   * Executes the getRemainingDays function from services/quarantine passing the quarantine model
   * as parameter
   * Returns the result as a json
   */
const getRemainingDays = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting days left to quarantine');
    const quarantineDTO = req.body;
    try {
        const result = yield quarantineService.getRemainingDays(quarantineDTO);
        //Return a response to the client.
        return res.status(200).json({
            status: 200,
            message: "Getting the days left to quarantine",
            daysRemaining: result
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
//Sets isQuarantined to true for the patient
const setQuarantineTrue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Setting isQuaratined to true for a Patient');
    const patientDTO = req.body;
    try {
        yield quarantineService.setQuarantineTrue(patientDTO);
        //Return a response to the client.
        return res.status(200).json({
            status: 200,
            message: "Setting the isQuarantined to true"
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.default = {
    inputStartDate,
    inputEndDate,
    getRemainingDays,
    setQuarantineTrue
};
