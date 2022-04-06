"use strict";
/**
 * @fileoverview
 * Repositories for the quarantine feature
 * Handles all the operations of the database: INSERT, SELECT, UPDATE
 * @package
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setQuarantineTrue = exports.checkIfPatientExistsInPatient = exports.checkIfPatientExists = exports.getRemainingDays = exports.inputEndDate = exports.inputStartDate = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'quarantine/repository';
/**
   * Inserts an input start time in the database for the quarantine table
   * The value for the column daysleft is null
   * PatientID must exist in the patient table before running the following query
   */
const inputStartDate = (quarantine) => {
    const query = `UPDATE quarantine SET quarantine.startDate = '${quarantine.startDate}' WHERE quarantine.patientID = '${quarantine.patientID}'`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.inputStartDate = inputStartDate;
const inputEndDate = (quarantine) => {
    const query = `UPDATE quarantine SET quarantine.endDate = "${quarantine.endDate}" WHERE quarantine.patientID = "${quarantine.patientID}"`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.inputEndDate = inputEndDate;
/**
   * Selects the value from daysleft converted to seconds
   * PatientID must exist in the patient table before running the following query
   */
const getRemainingDays = (quarantine) => {
    const query = `SELECT daysLeft FROM quarantine WHERE quarantine.patientID =  "${quarantine.patientID}"`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getRemainingDays = getRemainingDays;
//Selects everything from the patient table given a patientID
//This query is essentially to check if the patient exists
const checkIfPatientExists = (quarantine) => {
    const query = `SELECT * FROM quarantine WHERE quarantine.patientID = "${quarantine.patientID}"`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.checkIfPatientExists = checkIfPatientExists;
const checkIfPatientExistsInPatient = (patient) => {
    const query = `SELECT * FROM patient WHERE patientID = "${patient.patientID}"`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.checkIfPatientExistsInPatient = checkIfPatientExistsInPatient;
const setQuarantineTrue = (patient) => {
    const query = `UPDATE patient SET isQuarantined = 1 WHERE patientID = '${patient.patientID}'`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.setQuarantineTrue = setQuarantineTrue;
