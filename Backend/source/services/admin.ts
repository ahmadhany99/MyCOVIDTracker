import { adminModel } from '../models/admin';
import { accountModel } from '../models/account';
import * as accountRep from '../repositories/admin';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';

const NAMESPACE = 'doctor/service';

const assignPatient = async (account: accountModel) => {
    var patientID = await accountRep.checkIfDoctorExistsInDoctor(account);
    if (patientID[0] != undefined) {
        return accountRep.getDoctor(account);
    } else {
        logging.error(NAMESPACE, 'This doctor is not in doctor table');
        throw 'This doctor does not exist';
    }
};

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

export { assignPatient, createAccount };
