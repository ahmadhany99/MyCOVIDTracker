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
import * as accountRep from '../repositories/account';
import bcryptjs from 'bcryptjs';
import logging from '../config/logging';
import { GETACCOUNTTESTINGMODE } from '../testflags';

const NAMESPACE = 'account/service';

// Create Account service
const createAccount = async (acc: accountModel) => {
    if (acc.email == undefined || acc.email == null || acc.email == '') {
        throw new Error('email is null');
    }
    if (acc.password == undefined || acc.password == null || acc.password == '') {
        throw new Error('password is null');
    }
    //Check if the email already exists in the database
    var emailexists = await accountRep.getAccountByEmail(acc.email);
    if (emailexists[0] != undefined) {
        logging.error(NAMESPACE, 'email already exists in db');
        throw new Error('email in use');
    } else {
        bcryptjs
            .hash('' + acc.password, 10)
            .then((hash: any) => {
                acc.password = hash;
                accountRep
                    .createAccountPatient(acc)
                    .then(() => {
                        logging.debug(NAMESPACE, 'new account added successfully');
                    })
                    .catch((error) => {
                        logging.error(NAMESPACE, 'error while creating account');
                        throw error;
                    });
            })
            .catch((error) => {
                logging.error(NAMESPACE, 'error while hashing password');
                throw error;
            });
    }
};

// Login Account service
const loginAccount = async (acc: accountModel) => {
    if (acc.email == undefined || acc.email == null || acc.email == '') {
        throw new Error('email is null');
    }
    if (acc.password == undefined || acc.password == null || acc.password == '') {
        throw new Error('password is null');
    }
    //check if user exists
    var exists = await accountRep.getAccountByEmail(acc.email);
    if (exists[0] == undefined) {
        throw new Error('account does not exist');
    }

    logging.debug(NAMESPACE, 'this pw = ', acc.password);
    logging.debug(NAMESPACE, 'stored pw = ', exists[0].password);
    const result = await bcryptjs.compare('' + acc.password, '' + exists[0].password).then((isEqual: boolean) => {
        logging.debug(NAMESPACE, 'isEqual = ', isEqual);
        return isEqual;
    });
    logging.debug(NAMESPACE, 'result = ', result);
    return result;
};

//Delete Account Service
const deleteAccount = async (acc: accountModel) => {
    logging.debug(NAMESPACE, 'deleting account for ', acc.email);

    const exists = await accountRep.getAccountByEmail(acc.email);
    if (exists[0] != undefined) {
        return accountRep.deleteAccountByID(exists[0].accountID);
    }
};

//Fetch Account Service (#TODO why do we need this again aside from testing?)
const getAccount = (acc: accountModel) => {
    if (acc.email != undefined || acc.email != null || acc.email != '') {
        return accountRep.getAccountByEmail(acc.email);
    }
    if (GETACCOUNTTESTINGMODE) {
        return accountRep.getAllAccount();
    } else {
        return [];
    }
};

const getAllPatients = () => {
    return accountRep.getAccountByTypePatient();
};

export { loginAccount, createAccount, getAccount, deleteAccount, getAllPatients };
