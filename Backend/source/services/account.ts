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

const NAMESPACE = 'account/service';

// Login Account service
const loginAccount = async (acc: accountModel) => {
        //check if user exists
        var exists = await account.getAccountByUsername(acc.username);
        if (exists[0] == undefined) {
                throw new Error("Account does not exist");
        }

        var data = await account.getPasswordByUsername(acc.username);
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
        var emailexists = await account.getAccountByEmail(acc.email);
        var unameexists = await account.getAccountByUsername(acc.email);
        if (emailexists[0] != undefined){
                logging.error(NAMESPACE, "email already exists in db");
                throw new Error("email in use")
        } else if (unameexists[0] != undefined){ 
                logging.error(NAMESPACE, "username already exists in db");
                throw new Error("username in use");
        } else {
                bcryptjs.hash(acc.password, 10)
                .then((hash: any) => {
                        acc.password = hash;
                        account.createAccountPatient(acc)
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
        }  
}

//Delete Account Service
const deleteAccount = async (acc: accountModel) => {
        const exists = await account.getAccountByUsername(acc.username);
        logging.debug(NAMESPACE, "", exists);
        if (exists[0] == undefined) {
                throw new Error("account does not exist")
        }
        logging.debug(NAMESPACE, 'deleting account ', acc.username);
        return account.deleteAccountByUsername(acc.username);
}

//Fetch Account Service (#TODO why do we need this again aside from testing?)
const getAccount = (acc: accountModel) => {
        if (acc.username != null) {
                return account.getAccountByUsername(acc.username);
        }
        if (GETACCOUNTTESTINGMODE == true) {
                return account.getAllAccount();
        }
        else {
                return [];
        }
}

//#TODO should not be in account, we should have a separate db for doctors)
const getAllDoctors = () => {
        return account.getAccountByTypeDoctor();
}

const getAllPatients = () => {
        return account.getAccountByTypePatient();
}

export {
        loginAccount,
        createAccount,
        getAccount,
        deleteAccount,
        getAllDoctors,
        getAllPatients
};
