import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import { loginDTO } from '../models/loginDTO';
import logging from '../config/logging';

const NAMESPACE = 'account/repository';

const createAccount = (account: accountModel, hash: string, salt: string) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.lastname}", "${account.firstname}", "${account.email}", "${account.username}", "${hash}", 0, null, 0, "${salt}")`;
    return queryDatabase(query);
}

const getAccountByUsernameAndPassword = (account: accountModel) => {
    const query = `SELECT * FROM account WHERE username="${account.username}" AND password="${account.password}" `;
    return queryDatabase(query);
}

const getAccountByUsername = (account: accountModel) => {   
    const query = `SELECT * FROM account WHERE username="${account.username}" `;
    return queryDatabase(query);
}

const getAllAccount = () => {
    const query = `SELECT * FROM account`;
    return queryDatabase(query);
}

const getAllDoctors = () => {
    const query = `SELECT * FROM account WHERE typeId=1`;
    return queryDatabase(query);
}

const getPasswordByUsername = (account: accountModel) => {
    const query = `SELECT password FROM account WHERE username="${account.username}"`;
    return queryDatabase(query) as unknown as loginDTO[];
}

const checkIfUsernameExists = (account: accountModel) => {
    const query = `SELECT * FROM account WHERE username="${account.username}"`;
    return queryDatabase(query) as unknown as accountModel[];
}

const checkIfEmailExists = (account: accountModel) => {
    const query = `SELECT * FROM account WHERE email="${account.email}"`;
    return queryDatabase(query) as unknown as accountModel[];
}

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
    getAllDoctors
};


