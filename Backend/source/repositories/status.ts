import { queryDatabase } from '../DatabaseServices';
import { statusModel } from '../models/status';
import logging from '../config/logging';

const NAMESPACE = 'account/repository';

// adding a new entry to db
const createStatus = (status: statusModel) => {
    const query = `INSERT INTO status VALUES (rid, ${status.uid}, '${status.date}', '${status.report}')`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query);
}

// updating entry in db
const updateStatus = (status: statusModel) => {
    const query = `UPDATE status SET report = "${status.report}" WHERE uid = "${status.uid}" AND date = "${status.date}"`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query);
}

// deleting entry in db
const deleteStatus = (status: statusModel) => {
    const query = `DELETE FROM status WHERE uid = "${status.uid}" AND date = "${status.date}"`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query);
}

// get entry by user and date (unique)
const getStatusByUserAndDate = (status: statusModel) => {
    const query = `SELECT * FROM status WHERE uid = "${status.uid}" AND date = "${status.date}"`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query) as unknown as Promise<statusModel[]>;
}

// get all entries for one user
const getStatusByUser = (status: statusModel) => {
    const query = `SELECT * FROM status WHERE uid = "${status.uid}"`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query);
}

// get all entries in db
const getAllStatus = () => {
    const query = `SELECT * FROM status`;
    logging.debug(NAMESPACE, "db querying "+query);
    return queryDatabase(query);
}

export {
    createStatus,
    updateStatus,
    deleteStatus,
    getAllStatus,
    getStatusByUserAndDate,
    getStatusByUser
};

