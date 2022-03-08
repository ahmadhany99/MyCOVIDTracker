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
import { loginDTO } from "../models/loginDTO";
import { createAccount, getPasswordByUsername, getAccountByUsernameAndPassword, getAllAccount } from "../repositories/account";
import bcryptjs from 'bcryptjs';
import logging from "../config/logging";

const NAMESPACE = 'account/service';


const login = async (account: accountModel) => {
        var data = await getPasswordByUsername(account);
        const salt = data[0].salt;
        logging.debug(NAMESPACE, "this pw = ", account.password)
        logging.debug(NAMESPACE, "stored pw = ", data[0].password)
        bcryptjs.compare(account.password, data[0].password, (hashError, success) => {
                if (hashError) {
                        return ({
                                message: hashError.message,
                                error: hashError
                        })
                }
                var result = JSON.stringify(success.valueOf())
                logging.debug(NAMESPACE, "pw are equal = ", result)
                return result
        });
}

const create = async (account: accountModel) => {
        const salt = bcryptjs.genSaltSync(10);
        bcryptjs.hash(account.password, salt, (hashError, hash) => {
                if (hashError) {
                        logging.error(NAMESPACE, "error while creating account", hashError);
                        return ({
                                message: hashError.message,
                                error: hashError
                        })
                }
                createAccount(account, hash, salt);
        });
}

const getAccount = (account: accountModel) => {

        return getAllAccount(account);
}

export {
        login,
        create,
        getAccount
};
