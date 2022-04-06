"use strict";
/* Should:
        - Contain business logic
        - Leverage data access layer to interact with database
        - Be framework agnostic
    Should not:
        - Be provided req or req objects
        - Handle responding to clients
        - Provide anything related to HTTP transport layer: status codes, headers...
        - Directly interact with database
*/
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
exports.setQuarantineTrue = exports.getRemainingDays = exports.inputEndDate = exports.inputStartDate = void 0;
const qt = __importStar(require("../repositories/quarantine"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'quarantine/service';
/**
 * Returns the operation of inputStartTime from repositories/quarantine with quarantine model as the parameter
 */
const inputStartDate = (qtModel) => __awaiter(void 0, void 0, void 0, function* () {
    //Checks if the patient already exists in the patient table in database
    var patientID = yield qt.checkIfPatientExists(qtModel);
    if (patientID[0] != undefined) {
        logging_1.default.debug(NAMESPACE, "Creating new entry for quarantine:");
        return qt.inputStartDate(qtModel);
    }
    //if patient does not exist, throw error
    else {
        logging_1.default.error(NAMESPACE, "This patient is not in quarantine");
        throw ("Error: This patient is not in quarantine");
    }
});
exports.inputStartDate = inputStartDate;
const inputEndDate = (qtModel) => __awaiter(void 0, void 0, void 0, function* () {
    //Checks if the patient already exists in the patient table in database
    var patientID = yield qt.checkIfPatientExists(qtModel);
    if (patientID[0] != undefined) {
        logging_1.default.debug(NAMESPACE, "Creating new entry for quarantine:");
        return qt.inputEndDate(qtModel);
    }
    //if patient does not exist, throw error
    else {
        logging_1.default.error(NAMESPACE, "This patient is not in quarantine");
        throw ("Error: This patient is not in quarantine");
    }
});
exports.inputEndDate = inputEndDate;
/**
   * Returns the operation of getRemainingDays from repositories/quarantine with quarantine model as the parameter
   */
const getRemainingDays = (qtModel) => __awaiter(void 0, void 0, void 0, function* () {
    //Checks if the patient already exists in the patient table in database
    var patientID = yield qt.checkIfPatientExists(qtModel);
    if (patientID[0] != undefined) {
        logging_1.default.debug(NAMESPACE, "getting entry for quarantine daysLeft:", qtModel.daysLeft);
        return qt.getRemainingDays(qtModel);
    }
    //if patient does not exist, throw error
    else {
        logging_1.default.error(NAMESPACE, "This patient is not in quarantine");
        throw ("This patient is not in quarantine");
    }
});
exports.getRemainingDays = getRemainingDays;
const setQuarantineTrue = (patient) => __awaiter(void 0, void 0, void 0, function* () {
    var patientID = yield qt.checkIfPatientExistsInPatient(patient);
    if (patientID[0] != undefined) {
        return qt.setQuarantineTrue(patient);
    }
    else {
        logging_1.default.error(NAMESPACE, "This patient is not in patient table");
        throw ("This patient does not exist");
    }
});
exports.setQuarantineTrue = setQuarantineTrue;
