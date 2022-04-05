import { queryDatabase } from '../DatabaseServices';
import { statusModel } from '../models/status';
import logging from '../config/logging';

const NAMESPACE = 'status/repository';

// adding a new entry to db
const createStatus = (status: statusModel) => {
    const query = `INSERT INTO status(patientID, date, report) VALUES (${status.patientID}, '${status.date}', '${status.report}')`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query);
}

// updating entry in db
const updateStatus = (statusID: number|undefined, report: string[]|undefined) => {
    const query = `UPDATE status SET report = "${report}" WHERE statusID = "${statusID}"`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query);
}

// deleting entry in db
const deleteStatus = (statusID: number|undefined) => {
    const query = `DELETE FROM status WHERE statusID = "${statusID}"`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query);
}

// get entry by user and date (unique)
const getStatusByUserAndDate = (patientID: number|undefined, date: string|undefined) => {
    const query = `SELECT * FROM status WHERE patientID = "${patientID}" AND date = "${date}"`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query) as unknown as statusModel[];
}

// get all entries for one user
const getStatusByUser = (patientID: number|undefined) => {
    const query = `SELECT * FROM status WHERE patientID = "${patientID}"`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query) as unknown as statusModel[];
}

// get all entries for one date
const getStatusByDate = (date: string|undefined) => {
    const query = `SELECT * FROM status WHERE date = "${date}"`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query) as unknown as statusModel[];
}

// get all entries in db
const getAllStatus = () => {
    const query = `SELECT * FROM status`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query) as unknown as statusModel[];
}

export {
    createStatus,
    updateStatus,
    deleteStatus,

    getAllStatus,
    getStatusByUserAndDate,
    getStatusByUser,
    getStatusByDate
};

