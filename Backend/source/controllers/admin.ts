import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as adminService from '../services/admin';
import { doctorModel } from '../models/doctor';
import { accountModel } from '../models/account';

const NAMESPACE = 'controllers/admin';

const assignPatient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting a Doctor info');

    const accountDTO: accountModel = req.body;

    try {
        const result = await adminService.assignpatient(accountDTO);
        return res.json(result);
    } catch (err) {
        // returns error if deemed unsuccessful
        return res.status(500).json(err);
    }
};

const createAdminAccount = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create admin account');

    const accountDTO: accountModel = req.body;

    try {
        if (accountDTO.userType == 2) throw new Error('You are not a Super-Admin');
        //  Call to service layer
        const result = await adminService.createAccount(accountDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: 'Account created successfully'
        });
    } catch (e) {
        const err = e as Error;

        logging.error(NAMESPACE, err.message);
        if (err.message == 'email is null') {
            return res.status(400).json({
                status: 400,
                message: 'Email needs to have a value'
            });
        } else if (err.message == 'password is null') {
            return res.status(400).json({
                status: 400,
                message: 'Password needs to have a value'
            });
        } else if (err.message == 'email in use') {
            return res.status(409).json({
                status: 409,
                message: 'An account using this email already exists'
            });
        } else {
            return res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }
};

export default { assignPatient, createAdminAccount };
