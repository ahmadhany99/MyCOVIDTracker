import { accountModel as accountdb } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'account/repository';

//Create an account in table account with the passed accountModel, account will be a Patient (type=1)
const createAccount = (account: accountdb) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.email}", "${account.password}", "${account.username}", "${account.firstname}", "${account.lastname}", "${account.userType}", 1)`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}

//Create an account in table account with the passed accountModel
const createAccountWithID = (account: accountdb) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.email}", "${account.password}", "${account.username}", "${account.firstname}", "${account.lastname}", "${account.userType}", 1)`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}

//setters for account attributes
const setAccountEmail = (email: string|undefined, type: number|undefined) => {
    const query = `UPDATE account SET userType = ${type} WHERE email = ${email}`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}
const setAccountPassword = (password: string|undefined, type: number|undefined) => {
    const query = `UPDATE account SET userType = ${type} WHERE password = ${password}`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}
const setAccountUsername = (uid: number|undefined, email: string|undefined) => {
    const query = `UPDATE account SET email = ${email} WHERE accountID = ${uid}`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}
const setAccountFirstName = (uid: number|undefined, firstName: string|undefined) => {
    const query = `UPDATE account SET firstName = ${firstName} WHERE accountID = ${uid}`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}
const setAccountLastName = (uid: number|undefined, lastName: string|undefined) => {
    const query = `UPDATE account SET lastName = ${lastName} WHERE accountID = ${uid}`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}
const setAccountUserType = (uid: number|undefined, type: number|undefined) => {
    const query = `UPDATE account SET userType = ${type} WHERE accountID = ${uid}`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}
const setAccountLanguage = (uid: number|undefined, language: number|undefined) => {
    const query = `UPDATE account SET language = ${language} WHERE accountID = ${uid}`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}

//Get an account from table account based on a passeed account id
const getAccountByID = (uid: number|undefined) => {
    const query = `SELECT * FROM account WHERE accountID="${uid}"`;
    return queryDatabase(query) as unknown as accountdb[];
}

//Get an account from table account based on a passeed email
const getAccountByEmail = (email: string|undefined) => {   
    const query = `SELECT * FROM account WHERE email="${email}" `;
    return queryDatabase(query) as unknown as accountdb[];
}

//Get all accounts from table account
const getAllAccount = () => {
    const query = `SELECT * FROM account`;
    return queryDatabase(query) as unknown as accountdb[];
}

// Get all doctors from db. A doctor is an account with 2 as a typeId
const getAccountByTypeDoctor = () => {
    const query = `SELECT * FROM account WHERE userType=2`;
    return queryDatabase(query) as unknown as accountdb[];
}

// Get all patients from db. A patient is an account with 1 as a typeId
const getAccountByTypePatient = () => {
    const query = `SELECT * FROM account WHERE userType=1`;
    return queryDatabase(query) as unknown as accountdb[];
}

//Delete account from table account
const deleteAccountByID = (uid: number|undefined) => {
    const query = `DELETE FROM account WHERE accountID="${uid}"`;
    return queryDatabase(query);
}

export {
    createAccount,
    createAccountWithID,
    
    setAccountEmail,
    setAccountPassword,
    setAccountUsername,
    setAccountFirstName,
    setAccountLastName,
    setAccountUserType,
    setAccountLanguage,

    getAllAccount,
    getAccountByID,
    getAccountByEmail,
    getAccountByTypeDoctor,
    getAccountByTypePatient,

    deleteAccountByID
};


