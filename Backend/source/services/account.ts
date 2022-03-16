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


const NAMESPACE = 'account/service';

const login = async (acc: accountModel) => {
        var data = await account.getPasswordByUsername(acc);
        logging.debug(NAMESPACE, "this pw = ", acc.password);
        logging.debug(NAMESPACE, "stored pw = ", data[0].password);
        const result = await bcryptjs.compare(acc.password, data[0].password).then((isEqual: boolean) => {
                logging.debug(NAMESPACE, "isEqual = ", isEqual);
                return isEqual;
        })
        logging.debug(NAMESPACE, "result = ", result);
        return result;
}

//Method to create an account
const create = async (acc: accountModel) => {

        //Check if the username or email already exists in the database
        var username = await account.checkIfUsernameExists(acc);
        var email = await account.checkIfEmailExists(acc);
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

//Method to delete an account
const deleteAccount = async (acc: accountModel) => {
        logging.debug(NAMESPACE, 'deleting account ', acc.username);
        return account.deleteAccountByUsername(acc);
}


const getAccountTestingOnly = (acc: accountModel) => {
        if (acc.username != null) {
                return account.getAccountByUsername(acc);
        }
        return account.getAllAccount();
}

//Method to get an account
const getAccount = (acc: accountModel) => {
        if (acc.username != null) {
                return account.getAccountByUsername(acc);
        }
        throw (new Error("No username specified"));
}

//Method to get all doctors 
const getAllDoctors = () => {

        return account.getAllDoctors();
}

export {
        login,
        create,
        getAccountTestingOnly,
        getAccount,
        deleteAccount,
        getAllDoctors
};
