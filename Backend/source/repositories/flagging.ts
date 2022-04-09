import { flaggingModel } from '../models/flagging';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'flagging/repository';

// When patient is flagged, isPrioritized value in patient table of the database is set to 1
const flagPatient = (flagging: flaggingModel) => {
    const query = `UPDATE patient SET isPrioritized = 1 WHERE patientID = '${flagging.patientID}'`;
    return queryDatabase(query);
}

// When patient is unflagged, isPrioritized value in patient table of the database is set to 0
const unflagPatient = (flagging: flaggingModel) => {
    const query = `UPDATE patient SET isPrioritized = 0 WHERE patientID = '${flagging.patientID}'`;
    return queryDatabase(query);
}

// Returns list of flagged patients where isPrioritized value is set to 1
const getFlaggedPatients = (flagging: flaggingModel) => {   
    const query = `SELECT patient.*, account.firstName, account.lastName 
    FROM patient, account
    WHERE patient.patientID = account.accountID AND patient.isPrioritized = 1`;
    return queryDatabase(query);
}

export {
    flagPatient,
    getFlaggedPatients,
    unflagPatient
};