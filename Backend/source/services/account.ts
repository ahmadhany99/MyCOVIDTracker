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
import * as account from "../repositories/account";
import bcryptjs from 'bcryptjs';
import logging from "../config/logging";
import { GETACCOUNTTESTINGMODE } from "../testflags";
import { loginDTO } from "../models/loginDTO";
import { loginDTOToAccountModel } from "../functions/loginToAccountModel";

const NAMESPACE = 'account/service';

// Login Account service
const login = async (acc: loginDTO) => {
        //check if user exists
        var exists = await account.checkIfUsernameExists(acc.username);
        if (exists[0] == undefined) {
                return false;
        }

        var data = await account.getPasswordByUsername(loginDTOToAccountModel(acc));
        logging.debug(NAMESPACE, "this pw = ", acc.password);
        logging.debug(NAMESPACE, "stored pw = ", data[0].password);
        const result = await bcryptjs.compare(acc.password, data[0].password).then((isEqual: boolean) => {
                logging.debug(NAMESPACE, "isEqual = ", isEqual);
                return isEqual;
        })
        logging.debug(NAMESPACE, "result = ", result);
        return result;
}

// Create Account service
const createAccount = async (acc: accountModel) => {
        //Check if the username or email already exists in the database
        var username = await account.checkIfUsernameExists(acc.username);
        var email = await account.checkIfEmailExists(acc.email);
        if(username[0] == undefined && email[0] == undefined){
                bcryptjs.hash(acc.password, 10)
                .then((hash: any) => {
                        account.createAccount(acc, hash, '10')
                        .then(() => {
                                logging.debug(NAMESPACE, "new account added successfully");
                        })
                        .catch((error) => {
                                logging.error(NAMESPACE, "error while creating account");
                                throw (error);
                        })
                })
                .catch((error) => {
                        logging.error(NAMESPACE, "error while hashing password");
                        throw (error);
                })              
        }else{    
                //If username of email already exists, throw error
                logging.error(NAMESPACE, "username already exists");
                throw ("Username or email already exists.")
        }
}

//Delete Account Service
const deleteAccount = async (acc: accountModel) => {
        logging.debug(NAMESPACE, 'deleting account ', acc.username);
        return account.deleteAccountByUsername(acc);
}

//Fetch Account Service (#TODO why do we need this again aside from testing?)
const getAccount = (acc: accountModel) => {
        if (acc.username != null) {
                return account.getAccountByUsername(acc);
        }
        if (GETACCOUNTTESTINGMODE == true) {
                return account.getAllAccount();
        }
        else {
                throw (new Error("No username specified"));
        }
}

//Fetch Doctor Service (#TODO should not be in account, we should have a separate db for doctors)
const getAllDoctors = () => {

        return account.getAllDoctors();
}

export {
        login,
        createAccount,
        getAccount,
        deleteAccount,
        getAllDoctors
};
