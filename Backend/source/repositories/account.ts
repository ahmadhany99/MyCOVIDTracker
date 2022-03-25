import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'account/repository';

//Create an account in table account with the passed accountModel, account will be a Patient (type=1)
const createAccountPatient = (account: accountModel) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.email}", "${account.password}", "${account.email}", "${account.firstname}", "${account.lastname}", 1, 1, null)`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}

//Create an account in table account with the passed accountModel
const createAccountAdmin = (account: accountModel) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.email}", "${account.password}", "${account.email}", "${account.firstname}", "${account.lastname}", "${account.userType}", 1, null)`;
    logging.debug(NAMESPACE, query);
    return queryDatabase(query);
}

//Get an account from table account based on a passeed account id
const getAccountByID = (uid: number|undefined) => {
    const query = `SELECT * FROM account WHERE accountID="${uid}"`;
    return queryDatabase(query) as unknown as accountModel[];
}

//Get an account from table account based on a passeed email
const getAccountByEmail = (email: string|undefined) => {   
    const query = `SELECT * FROM account WHERE email="${email}" `;
    return queryDatabase(query) as unknown as accountModel[];
}

//Get all accounts from table account
const getAllAccount = () => {
    const query = `SELECT * FROM account`;
    return queryDatabase(query) as unknown as accountModel[];
}

// Get all doctors from db. A doctor is an account with 2 as a typeId
const getAccountByTypeDoctor = () => {
    const query = `SELECT * FROM account WHERE userType=2`;
    return queryDatabase(query) as unknown as accountModel[];
}

// Get all patients from db. A patient is an account with 1 as a typeId
const getAccountByTypePatient = () => {
    const query = `SELECT * FROM account WHERE userType=1`;
    return queryDatabase(query) as unknown as accountModel[];
}

//Delete account from table account
const deleteAccountByID = (id: number|undefined) => {
    const query = `DELETE FROM account WHERE accountID="${id}"`;
    return queryDatabase(query);
}

export {
    createAccountPatient,
    createAccountAdmin,
    getAccountByEmail,
    getAccountByID,
    getAllAccount,
    deleteAccountByID,
    getAccountByTypeDoctor,
    getAccountByTypePatient
};


