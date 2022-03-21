import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as accountService from '../services/account';
import { accountModel } from '../models/account';
import { loginDTO } from '../models/loginDTO';
import signJWT from '../functions/signJWT';

const NAMESPACE = 'account/controller';

const register = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create account');

    //  Data Transfer Object (DTO)
    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.createAccount(accountDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: 'Account Created.'
        });
    } catch (e) {
        return res.status(500).json(e);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Login to account.');

    //  Data Transfer Object (DTO)
    const accountDTO: loginDTO = req.body;

    //  Todo: Insert middleware isUserValid = validators.user(reqBody) instead of following
    try {
        if (!accountDTO.username || !accountDTO.password) {
            return res.status(400).json({
                status: 400,
                message: 'Missing username or password'
            });
        }

        //  Call to service layer
        const result = await accountService.login(accountDTO);

        // Return a response to client.
        return res.json(result);
    } catch (e) {
        return res.status(500).json(e);
    }
};

const getAccount = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Retrieving Account from Database');

    //  Data Transfer Object (DTO)
    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.getAccount(accountDTO);

        // Return a response to client.
        return res.json(result);
    } catch (e) {
        return res.status(500).json(e);
    }
};

const getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Retrieving Doctors from Database');

    try {
        //  Call to service layer
        const result = await accountService.getAllDoctors();

        // Return a response to client.
        return res.json(result);
    } catch (e) {
        return res.status(500).json(e);
    }
};

const getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Retrieving Patients from Database');

    try {
        //  Call to service layer
        const result = await accountService.getAllPatients();

        // Return a response to client.
        return res.json(result);
    } catch (e) {
        return res.status(500).json(e);
    }
};

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Deleting Account');

    const accountDTO: accountModel = req.body;

    try {
        const result = await accountService.deleteAccount(accountDTO);

        return res.json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};

export default {
    register,
    login,
    getAccount,
    deleteAccount,
    getAllDoctors,
    getAllPatients
};
