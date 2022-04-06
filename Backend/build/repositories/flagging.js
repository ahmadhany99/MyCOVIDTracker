"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlaggedPatients = exports.flagPatient = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const NAMESPACE = 'flagging/repository';
// When patient is flagged, isPrioritized value in patient table of the database is set to 1
const flagPatient = (flagging) => {
    const query = `UPDATE patient SET isPrioritized = 1 WHERE patientID = '${flagging.patientID}'`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.flagPatient = flagPatient;
// Returns list of flagged patients where isPrioritized value is set to 1
const getFlaggedPatients = (flagging) => {
    const query = `SELECT patient.*, account.firstName, account.lastName 
    FROM patient, account
    WHERE patient.patientID = account.accountID AND patient.isPrioritized = 1`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getFlaggedPatients = getFlaggedPatients;
