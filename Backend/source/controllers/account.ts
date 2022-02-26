import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as accountService from '../services/account';
import { accountModel } from '../models/account';
import signJWT from '../functions/signJWT';



const NAMESPACE = 'Account';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validated, user authorized.");

    return res.status(200).json({
        message: "Authorized"
    });
}
const register = async (req: Request, res: Response, next: NextFunction) => {
    const user: accountModel = req.body;
    logging.info(NAMESPACE, 'Creating user.');

    //  Data Transfer Object (DTO)
    const userDTO: accountModel = req.body;
    
    //  Todo: Insert middleware isUserValid = validators.user(reqBody) instead of following
    try{
        if (!userDTO.username || !userDTO.password){
            return res.status(400).json({
                status: 400,
                message: "Missing username or password"
            })
        }
        
        //  Call to service layer
        const result = await accountService.register(userDTO);

        // Return a response to client.
        return res.json(user);

    } catch(e){
        return res.status(500).json(e);
    }

}
const login = async (req: Request, res: Response, next: NextFunction) => {
    const account: accountModel = req.body;
    logging.info(NAMESPACE, 'Login to account.');


    //  Data Transfer Object (DTO)
    const accountDTO: accountModel = req.body;
    
    //  Todo: Insert middleware isUserValid = validators.user(reqBody) instead of following
    try{
        if (!accountDTO.username || !accountDTO.password){
            return res.status(400).json({
                status: 400,
                message: "Missing username or password"
            })
        }
        
        //  Call to service layer
        const result = await accountService.login(accountDTO);

        // Return a response to client.
        return res.json(result);

    } catch(e){
        return res.status(500).json(e);
    }

}


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all samples.');

    //  Call to service layer
    const result = await accountService.retrieveSample();

    // Return a response to client.
    return res.json(result);
};
export default {validateToken, register, login, getAllUsers};


