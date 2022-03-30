"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountByTypePatient = exports.getAccountByTypeDoctor = exports.deleteAccountByID = exports.getAllAccount = exports.getAccountByID = exports.getAccountByEmail = exports.createAccountAdmin = exports.createAccountPatient = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'account/repository';
//Create an account in table account with the passed accountModel, account will be a Patient (type=1)
const createAccountPatient = (account) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.email}", "${account.password}", "${account.email}", "${account.firstname}", "${account.lastname}", 1, 1, null)`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.createAccountPatient = createAccountPatient;
//Create an account in table account with the passed accountModel
const createAccountAdmin = (account) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.email}", "${account.password}", "${account.email}", "${account.firstname}", "${account.lastname}", "${account.userType}", 1, null)`;
    logging_1.default.debug(NAMESPACE, query);
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.createAccountAdmin = createAccountAdmin;
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
const deleteAccountByID = (id) => {
    const query = `DELETE FROM account WHERE accountID="${id}"`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.deleteAccountByID = deleteAccountByID;
