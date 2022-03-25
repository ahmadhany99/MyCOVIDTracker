"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDoctors = exports.checkIfEmailExists = exports.checkIfUsernameExists = exports.deleteAccountByUsername = exports.getPasswordByUsername = exports.getAllAccount = exports.getAccountByUsername = exports.getAccountByUsernameAndPassword = exports.createAccount = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const NAMESPACE = 'account/repository';
//Create an account in table account with the passed accountModel and a hashed password
const createAccount = (account, hash, salt) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.lastname}", "${account.firstname}", "${account.email}", "${account.username}", "${hash}", 0, null, 0, "${salt}")`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.createAccount = createAccount;
//Get an account from table account based on a passeed username and password
const getAccountByUsernameAndPassword = (account) => {
    const query = `SELECT * FROM account WHERE username="${account.username}" AND password="${account.password}" `;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAccountByUsernameAndPassword = getAccountByUsernameAndPassword;
//Get an account from table account based on a passeed username
const getAccountByUsername = (account) => {
    const query = `SELECT * FROM account WHERE username="${account.username}" `;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAccountByUsername = getAccountByUsername;
//Get all accounts from table account
const getAllAccount = () => {
    const query = `SELECT * FROM account`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAllAccount = getAllAccount;
// Get all doctors from db. A doctor is an account with 1 as a typeId
const getAllDoctors = () => {
    const query = `SELECT * FROM account WHERE typeId=1`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAllDoctors = getAllDoctors;
//Get the password of the account based on a passeed username
const getPasswordByUsername = (account) => {
    const query = `SELECT password FROM account WHERE username="${account.username}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getPasswordByUsername = getPasswordByUsername;
//Get all the accounts from database with a passed username to verify if an account with this username already exists
const checkIfUsernameExists = (username) => {
    const query = `SELECT * FROM account WHERE username="${username}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.checkIfUsernameExists = checkIfUsernameExists;
//Get all the accounts from database with a passed email to verify if an account with this email already exists
const checkIfEmailExists = (email) => {
    const query = `SELECT * FROM account WHERE email="${email}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.checkIfEmailExists = checkIfEmailExists;
//Delete account from table account
const deleteAccountByUsername = (account) => {
    const query = `DELETE FROM account WHERE username="${account.username}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.deleteAccountByUsername = deleteAccountByUsername;
