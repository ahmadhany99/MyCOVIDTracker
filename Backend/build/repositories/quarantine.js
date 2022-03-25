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
exports.checkIfPatientExists = exports.getRemainingDays = exports.calculateDaysLeft = exports.inputStartTime = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'quarantine/repository';
/**
   * Inserts an input start time in the database for the quarantine table
   * The value for the column daysleft is null
   * PatientID must exist in the patient table before running the following query
   */
const inputStartTime = (quarantine) => {
    const query = `INSERT INTO quarantine VALUES ("${quarantine.patientID}","${quarantine.inQuarantine}", "${quarantine.startTime}",
     "${quarantine.endDate}",null)`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.inputStartTime = inputStartTime;
/**
   * Updates the quarantine table by finding the date diff between startDate and endDate and adding to daysLeft column
   *PatientID must exist in the patient table before running the following query
   */
const calculateDaysLeft = (quarantine) => {
    const query = `UPDATE quarantine SET quarantine.daysLeft = DATEDIFF(quarantine.endDate, quarantine.startTime) WHERE quarantine.patientID =
    "${quarantine.patientID}"`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.calculateDaysLeft = calculateDaysLeft;
/**
   * Selects the value from daysleft converted to seconds
   * PatientID must exist in the patient table before running the following query
   */
const getRemainingDays = (quarantine) => {
    const query = `SELECT (quarantine.daysLeft* 86400) as daysLeft FROM quarantine WHERE quarantine.patientID =  "${quarantine.patientID}"`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getRemainingDays = getRemainingDays;
//Selects everything from the patient table given a patientID
//This query is essentially to check if the patient exists
const checkIfPatientExists = (patient) => {
    const query = `SELECT * FROM patient WHERE patientID = "${patient.patientID}"`;
    logging_1.default.debug(NAMESPACE, "query:", query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.checkIfPatientExists = checkIfPatientExists;
