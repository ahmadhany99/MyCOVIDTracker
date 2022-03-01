import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';
import { loginDTO } from '../models/loginDTO';

const NAMESPACE = 'account/repository';

const getAccountByUsernameAndPassword = (account: accountModel) => {
    const query = `SELECT * FROM account WHERE username="${account.username}" AND password="${account.password}" `;
    return queryDatabase(query);
}

const createAccount = (account: accountModel, hash: string, salt: string) => {
    const query = `INSERT INTO account VALUES (accountID, "${account.lastname}", "${account.firstname}", "${account.email}", "${account.username}", "${hash}", 0, null, 0, "${salt}")`;
    return queryDatabase(query);
}

const getPasswordByUsername = (account: accountModel) => {   
    const query = `SELECT password, salt FROM account WHERE username="${account.username}" `;
    return queryDatabase(query) as unknown as loginDTO[];
}

const getAllAccount = (account: accountModel) => {   
    const query = `SELECT * FROM account`;
    return queryDatabase(query);
}

export { createAccount, getAllAccount, getAccountByUsernameAndPassword, getPasswordByUsername};


