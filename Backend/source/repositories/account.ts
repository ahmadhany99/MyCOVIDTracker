import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import { loginDTO } from '../models/loginDTO';
import logging from '../config/logging';

const NAMESPACE = 'account/repository';

//Create an account in table account with the passed accountModel and a hashed password
const createAccount = (account: accountModel, hash: string, salt: string) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.lastname}", "${account.firstname}", "${account.email}", "${account.username}", "${hash}", 0, null, 0, "${salt}")`;
    return queryDatabase(query);
}

//Get an account from table account based on a passeed username and password
const getAccountByUsernameAndPassword = (account: accountModel) => {
    const query = `SELECT * FROM account WHERE username="${account.username}" AND password="${account.password}" `;
    return queryDatabase(query);
}

//Get an account from table account based on a passeed username
const getAccountByUsername = (account: accountModel) => {   
    const query = `SELECT * FROM account WHERE username="${account.username}" `;
    return queryDatabase(query);
}

//Get all accounts from table account
const getAllAccount = () => {
    const query = `SELECT * FROM account`;
    return queryDatabase(query);
}

// Get all doctors from db. A doctor is an account with 1 as a typeId
const getAllDoctors = () => {
    const query = `SELECT * FROM account WHERE typeId=1`;
    return queryDatabase(query);
}

// Get all patients from db. A patient is an account with 0 as a typeId
const getAllPatients = () => {
    const query = `SELECT * FROM account WHERE typeId=0`;
    return queryDatabase(query);
}

//Get the password of the account based on a passeed username
const getPasswordByUsername = (account: accountModel) => {
    const query = `SELECT password FROM account WHERE username="${account.username}"`;
    return queryDatabase(query) as unknown as loginDTO[];
}

//Get all the accounts from database with a passed username to verify if an account with this username already exists
const checkIfUsernameExists = (username: string) => {
    const query = `SELECT * FROM account WHERE username="${username}"`;
    return queryDatabase(query) as unknown as accountModel[];
}

//Get all the accounts from database with a passed email to verify if an account with this email already exists
const checkIfEmailExists = (email: string) => {
    const query = `SELECT * FROM account WHERE email="${email}"`;
    return queryDatabase(query) as unknown as accountModel[];
}

//Delete account from table account
const deleteAccountByUsername = (account: accountModel) => {
    const query = `DELETE FROM account WHERE username="${account.username}"`;
    return queryDatabase(query);
}

export {
    createAccount,
    getAccountByUsernameAndPassword,
    getAccountByUsername,
    getAllAccount,
    getPasswordByUsername,
    deleteAccountByUsername,
    checkIfUsernameExists,
    checkIfEmailExists,
    getAllDoctors,
    getAllPatients
};


