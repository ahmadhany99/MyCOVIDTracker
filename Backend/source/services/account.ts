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
import { getAccountByUsernameAndPassword,createAccount,getAccountByUsername  } from "../repositories/account";
import bcryptjs, { hash } from 'bcryptjs';

const NAMESPACE = 'account/service';


const login = (account: accountModel) => {

        return getAccountByUsernameAndPassword(account);
}

const create = (account: accountModel) => {

        return createAccount(account);
}

const getAccount = (account: accountModel) => {

        return getAccountByUsername(account);
}




export {login,create,getAccount};
