import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'account/repository';



const getAccountByUsernameAndPassword = (account: accountModel) => {   
    const query = `SELECT * FROM account WHERE username="${account.username}" AND password="${account.password}" `;
    return queryDatabase(query);
}

const createAccount = (account: accountModel) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.lastname}", "${account.firstname}", "${account.email}", "${account.username}", "${account.password}",${account.typeId}, null, 0)`;
    return queryDatabase(query);
}

const getAccountByUsername = (account: accountModel) => {   
    const query = `SELECT * FROM account WHERE username="${account.username}" `;
    return queryDatabase(query);
}


export {getAccountByUsername, createAccount, getAccountByUsernameAndPassword};


