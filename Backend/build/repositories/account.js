"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDoctors = exports.checkIfEmailExists = exports.checkIfUsernameExists = exports.deleteAccountByUsername = exports.getPasswordByUsername = exports.getAllAccount = exports.getAccountByUsername = exports.getAccountByUsernameAndPassword = exports.createAccount = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const NAMESPACE = 'account/repository';
const createAccount = (account, hash, salt) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.lastname}", "${account.firstname}", "${account.email}", "${account.username}", "${hash}", 0, null, 0, "${salt}")`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.createAccount = createAccount;
const getAccountByUsernameAndPassword = (account) => {
    const query = `SELECT * FROM account WHERE username="${account.username}" AND password="${account.password}" `;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAccountByUsernameAndPassword = getAccountByUsernameAndPassword;
const getAccountByUsername = (account) => {
    const query = `SELECT * FROM account WHERE username="${account.username}" `;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAccountByUsername = getAccountByUsername;
const getAllAccount = () => {
    const query = `SELECT * FROM account`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAllAccount = getAllAccount;
const getAllDoctors = () => {
    const query = `SELECT * FROM account WHERE typeId=1`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAllDoctors = getAllDoctors;
const getPasswordByUsername = (account) => {
    const query = `SELECT password FROM account WHERE username="${account.username}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getPasswordByUsername = getPasswordByUsername;
const checkIfUsernameExists = (account) => {
    const query = `SELECT * FROM account WHERE username="${account.username}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.checkIfUsernameExists = checkIfUsernameExists;
const checkIfEmailExists = (account) => {
    const query = `SELECT * FROM account WHERE email="${account.email}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.checkIfEmailExists = checkIfEmailExists;
const deleteAccountByUsername = (account) => {
    const query = `DELETE FROM account WHERE username="${account.username}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.deleteAccountByUsername = deleteAccountByUsername;
