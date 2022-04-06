"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccountByEmail = exports.getAccountByTypePatient = exports.getAccountByTypeDoctor = exports.getAccountByEmail = exports.getAccountByID = exports.getAllAccount = exports.setAccountLanguage = exports.setAccountUserType = exports.setAccountLastName = exports.setAccountFirstName = exports.setAccountUsername = exports.setAccountPassword = exports.setAccountEmail = exports.createAccountWithID = exports.createAccount = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'account/repository';
//Create an account in table account with the passed accountModel, account will be a Patient (type=1)
const createAccount = (account) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.email}", "${account.password}", "${account.username}", "${account.firstname}", "${account.lastname}", "${account.userType}", 1)`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.createAccount = createAccount;
//Create an account in table account with the passed accountModel
const createAccountWithID = (account) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.email}", "${account.password}", "${account.username}", "${account.firstname}", "${account.lastname}", "${account.userType}", 1)`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.createAccountWithID = createAccountWithID;
//setters for account attributes
const setAccountEmail = (email, type) => {
    const query = `UPDATE account SET userType = ${type} WHERE email = ${email}`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.setAccountEmail = setAccountEmail;
const setAccountPassword = (password, type) => {
    const query = `UPDATE account SET userType = ${type} WHERE password = ${password}`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.setAccountPassword = setAccountPassword;
const setAccountUsername = (uid, email) => {
    const query = `UPDATE account SET email = ${email} WHERE accountID = ${uid}`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.setAccountUsername = setAccountUsername;
const setAccountFirstName = (uid, firstName) => {
    const query = `UPDATE account SET firstName = ${firstName} WHERE accountID = ${uid}`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.setAccountFirstName = setAccountFirstName;
const setAccountLastName = (uid, lastName) => {
    const query = `UPDATE account SET lastName = ${lastName} WHERE accountID = ${uid}`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.setAccountLastName = setAccountLastName;
const setAccountUserType = (uid, type) => {
    const query = `UPDATE account SET userType = ${type} WHERE accountID = ${uid}`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.setAccountUserType = setAccountUserType;
const setAccountLanguage = (uid, language) => {
    const query = `UPDATE account SET language = ${language} WHERE accountID = ${uid}`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.setAccountLanguage = setAccountLanguage;
//Get an account from table account based on a passeed account id
const getAccountByID = (uid) => {
    const query = `SELECT * FROM account WHERE accountID="${uid}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAccountByID = getAccountByID;
//Get an account from table account based on a passeed email
const getAccountByEmail = (email) => {
    const query = `SELECT * FROM account WHERE email="${email}" `;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAccountByEmail = getAccountByEmail;
//Get all accounts from table account
const getAllAccount = () => {
    const query = `SELECT * FROM account`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAllAccount = getAllAccount;
// Get all doctors from db. A doctor is an account with 2 as a typeId
const getAccountByTypeDoctor = () => {
    const query = `SELECT * FROM account WHERE userType=2`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAccountByTypeDoctor = getAccountByTypeDoctor;
// Get all patients from db. A patient is an account with 1 as a typeId
const getAccountByTypePatient = () => {
    const query = `SELECT * FROM account WHERE userType=1`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAccountByTypePatient = getAccountByTypePatient;
//Delete account from table account
const deleteAccountByEmail = (email) => {
    const query = `DELETE FROM account WHERE email="${email}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.deleteAccountByEmail = deleteAccountByEmail;
