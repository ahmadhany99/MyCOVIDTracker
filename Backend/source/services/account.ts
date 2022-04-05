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

import { accountModel } from '../models/account';
import * as accountdb from '../repositories/account';
import bcryptjs from 'bcryptjs';
import logging from "../config/logging";
import { ACCOUNTTESTINGMODE } from "../testflags";

const NAMESPACE = 'account/service';

// Create Account Service
const createAccount = async (acc: accountModel) => {
        // verify account obj has necessary fields
        if (acc.email == undefined || acc.email == null || acc.email == "") {
                throw new Error("email is null")
        }
        if (acc.password == undefined || acc.password == null || acc.password == "") {
                throw new Error("password is null")
        }
        //Check if the email already exists in the database
        var emailexists = await accountdb.getAccountByEmail(acc.email);
        if (emailexists[0] != undefined){
                logging.error(NAMESPACE, "email already used by existing account in db");
                throw new Error("account exist")
        } else {
                // hash password
                bcryptjs.hash(""+acc.password, 10)
                .then((hash: string) => {
                        acc.password = hash;
                        // create new account
                        accountdb.createAccount(acc)
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

// Create Account Service for Admin
const createAccountAdmin = async (acc: accountModel) => {
        // verify account obj has necessary fields
        if (acc.email == undefined || acc.email == null || acc.email == "") {
                throw new Error("email is null")
        }
        if (acc.password == undefined || acc.password == null || acc.password == "") {
                throw new Error("password is null")
        }
        if (acc.userType == undefined || acc.userType == null) {
                throw new Error("type is null")
        }
        //Check if account already exists
        var exists = await accountdb.getAccountByEmail(acc.email);
        if (exists[0] != undefined){
                logging.error(NAMESPACE, "email already exists in db");
                throw new Error("account exist");
        } else {
                //hash password
                bcryptjs.hash(""+acc.password, 10)
                .then((hash: string) => {
                        acc.password = hash;
                        //create account
                        accountdb.createAccountWithID(acc)
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

// Login Service
const loginAccount = async (acc: accountModel) => {
        if (acc.email == undefined || acc.email == null || acc.email == "") {
                throw new Error("email is null")
        }
        if (acc.password == undefined || acc.password == null || acc.password == "") {
                throw new Error("password is null")
        }
        //check if user exists
        var exists = await accountdb.getAccountByEmail(acc.email);
        if (exists[0] == undefined) {
                throw new Error("account does not exist");
        }

        const result = await bcryptjs.compare(""+acc.password, ""+exists[0].password).then((isEqual: boolean) => {
                logging.debug(NAMESPACE, "password is ", isEqual?"true":"false");
                return isEqual;
        })
        logging.debug(NAMESPACE, "result = ", result);
        return result;
}

// Login Service for Admins
const loginAccountAdmin = async (acc: accountModel) => {
        if (acc.email == undefined || acc.email == null || acc.email == "") {
                throw new Error("email is null")
        }
        if (acc.password == undefined || acc.password == null || acc.password == "") {
                throw new Error("password is null")
        }
        //check if user exists
        var exists = await accountdb.getAccountByEmail(acc.email);
        if (exists[0] == undefined) {
                throw new Error("account does not exist");
        }
        if (exists[0].userType == 1) {
                throw new Error("account is not admin");
        }
        const result = await bcryptjs.compare(""+acc.password, ""+exists[0].password).then((isEqual: boolean) => {
                logging.debug(NAMESPACE, "password is right = ", isEqual);
                return isEqual;
        })
        logging.debug(NAMESPACE, "result = ", result);
        return result;
}

//Delete Account Service
const deleteAccount = async (acc: accountModel) => {
        //check if email specified
        if (acc.email == undefined || acc.email == null || acc.email == "") {
                throw new Error("email is null")
        }
        //check if account exist
        const exists = await accountdb.getAccountByEmail(acc.email);
        if (exists[0] == undefined) {
                throw new Error("account does not exist")
        }
        return accountdb.deleteAccountByEmail(exists[0].email);
}

//Fetch Account Service (#TODO why do we need this again aside from testing?)
const getAccount = async (acc: accountModel) => {
        //check if in testing mode
        if (ACCOUNTTESTINGMODE && acc.email == undefined) {
                return accountdb.getAllAccount();
        }
        else {
                const results = await accountdb.getAccountByEmail(acc.email);        
                //check if email specified
                if (acc.email == undefined || acc.email == null || acc.email == "") {
                        throw new Error("email is null");
                }
                if (results[0] == undefined) {
                        throw new Error("account does not exist")
                }
                return results;
        }
}

const getPatientAccounts = async () => {
        return accountdb.getAccountByTypePatient();
}

const getDoctorAccounts = async () => {
        return accountdb.getAccountByTypeDoctor();
}

export {
        loginAccount,
        loginAccountAdmin,
        createAccount,
        createAccountAdmin,
        getAccount,
        getPatientAccounts,
        getDoctorAccounts,
        deleteAccount
};