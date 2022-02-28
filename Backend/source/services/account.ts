/* Should: 
        - Contain business logic
        - Leverage data access layer to interact with database
        - Be framework agnostic
    Should not:
        - Be provided req or req objects
        - Handle responding to clients
        - Provide anything related to HTTP transport layer: status codes, headers...
        - Directly interact with database
*/

import { accountModel } from "../models/account";
import { createAccount, getAccountByUsername, getAccountByUsernameAndPassword, getAllAccount } from "../repositories/account";
import bcryptjs, { hash } from 'bcryptjs';
import logging from "../config/logging";

const NAMESPACE = 'account/service';


const login = (account: accountModel) => {

        return getAccountByUsername(account);
}

const create = async(account: accountModel) => {
        const salt = bcryptjs.genSaltSync(10).substring(0,9);
        logging.debug(NAMESPACE, "[salt] = "+salt);
        bcryptjs.hash(account.password, salt, (hashError, hash) => {
                if (hashError) {
                        return ({
                                message: hashError.message,
                                error: hashError
                        })
                }
                logging.debug(NAMESPACE, account.username+":"+hash);
                createAccount(account, hash, salt);
        });
}

const getAccount = (account: accountModel) => {

        return getAllAccount(account);
}




export {login,create,getAccount};
