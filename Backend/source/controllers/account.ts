import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as accountService from '../services/account';
import { accountModel } from '../models/account';
import signJWT from '../functions/signJWT';

const NAMESPACE = 'account/controller';

const register = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create account');

    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.createAccount(accountDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "Account created successfully"
        });

    } catch (e) {
        const err = e as Error;

        logging.error(NAMESPACE, err.message);
        if (err.message == "email is null") {
            return res.status(400).json({
                status: 400,
                message: "Email needs to have a value"
            })
        } else if (err.message == "username is null") {
            return res.status(400).json({
                status: 400,
                message: "Username needs to have a value"
            })
        } else if (err.message == "password is null") {
            return res.status(400).json({
                status: 400,
                message: "Password needs to have a value"
            })
        } else if (err.message == "email in use") {
            return res.status(409).json({
                status: 409,
                message: "An account using this email already exists"
            })
        } else if (err.message == "username in use") {
            return res.status(409).json({
                status: 409,
                message: "An account using this username already exists"
            })
        } else {
            return res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Login to account.');

    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.loginAccount(accountDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "login successful",
            passwordIsCorrect: result
        })

    } catch (e) {
        const err = e as Error;
        if (err.message == "username is null") {
            return res.status(400).json({
                status: 400,
                message: "username needs to have a value"
            })
        } else if (err.message == "password is null") {
            return res.status(400).json({
                status: 400,
                message: "password needs to have a value"
            })
        } else if (err.message == "account does not exist") {
            return res.status(404).json({
                status: 404,
                message: "No Account found for username "+accountDTO.username
            })
        } else {
            return res.status(500).json({
                status: 500,
                message: err.message
            })
        }
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
        return res.status(200).json({
            status: 200,
            result: result
        });

    } catch (e) {
        const err = e as Error;
        return res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}

const getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Retrieving Account from Database');

    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.getAllPatients();

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: result
        });

    } catch (e) {
        const err = e as Error;
        return res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}

const getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Retrieving Account from Database');

    //  Data Transfer Object (DTO)
    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.getAllDoctors();

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: result
        });

    } catch (e) {
        const err = e as Error;
        return res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Deleting Account from Database');

    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.deleteAccount(accountDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: "Account has been deleted"
        });

    } catch (e) {
        const err = e as Error;
        if (err.message == "account does not exist") {
            return res.status(404).json({
                status: 404,
                message: "No Account found for username "+accountDTO.username
            })
        } else {
            return res.status(500).json({
                status: 500,
                message: err.message
            });
        }
        
    }
}

export default {
    register,
    login,
    getAccount,
    deleteAccount,
    getAllDoctors,
    getAllPatients
};
