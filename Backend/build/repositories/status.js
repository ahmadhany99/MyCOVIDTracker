"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusByUser = exports.getStatusByUserAndDate = exports.getAllStatus = exports.deleteStatus = exports.updateStatus = exports.createStatus = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'account/repository';
// adding a new entry to db
const createStatus = (status) => {
    const query = `INSERT INTO status VALUES (rid, ${status.uid}, '${status.date}', '${status.report}')`;
    logging_1.default.debug(NAMESPACE, "db querying " + query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.createStatus = createStatus;
// updating entry in db
const updateStatus = (status) => {
    const query = `UPDATE status SET report = "${status.report}" WHERE uid = "${status.uid}" AND date = "${status.date}"`;
    logging_1.default.debug(NAMESPACE, "db querying " + query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.updateStatus = updateStatus;
// deleting entry in db
const deleteStatus = (status) => {
    const query = `DELETE FROM status WHERE uid = "${status.uid}" AND date = "${status.date}"`;
    logging_1.default.debug(NAMESPACE, "db querying " + query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.deleteStatus = deleteStatus;
// get entry by user and date (unique)
const getStatusByUserAndDate = (status) => {
    const query = `SELECT * FROM status WHERE uid = "${status.uid}" AND date = "${status.date}"`;
    logging_1.default.debug(NAMESPACE, "db querying " + query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getStatusByUserAndDate = getStatusByUserAndDate;
// get all entries for one user
const getStatusByUser = (status) => {
    const query = `SELECT * FROM status WHERE uid = "${status.uid}"`;
    logging_1.default.debug(NAMESPACE, "db querying " + query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getStatusByUser = getStatusByUser;
// get all entries in db
const getAllStatus = () => {
    const query = `SELECT * FROM status`;
    logging_1.default.debug(NAMESPACE, "db querying " + query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAllStatus = getAllStatus;
