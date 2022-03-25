import { flaggingModel } from '../models/flagging';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'flagging/repository';

// When patient is flagged, isPrioritized value in patient table of the database is set to 1
const flagPatient = (flagging: flaggingModel) => {
    const query = `UPDATE patient SET isPrioritized = 1 WHERE patientID = '${flagging.patientID}'`;
    return queryDatabase(query);
}

// Returns list of flagged patients where isPrioritized value is set to 1
const getFlaggedPatients = (flagging: flaggingModel) => {   
    const query = `SELECT * FROM patient WHERE isPrioritized = 1`;
    return queryDatabase(query);
}

export {
    flagPatient,
    getFlaggedPatients
};