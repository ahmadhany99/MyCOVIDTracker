import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as userService from '../services/user';
import { userModel } from '../models/user';
import bcryptjs from 'bcryptjs';

const NAMESPACE = 'User';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Creating user.');

    //  Data Transfer Object (DTO)
    const userDTO: userModel = req.body;
    
    //  Todo: Insert middleware isUserValid = validators.user(reqBody) instead of following
    try{
        if (!userDTO.username || !userDTO.password){
            return res.status(400).json({
                status: 400,
                message: "Missing LastName or FirstName"
            })
        }
        
        //  Call to service layer
        const user = await userService.Signup(userDTO);

        // Return a response to client.
        return res.json(user);

    } catch(e){
        return res.status(500).json(e);
    }
};


const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validated, user authorized.");

    return res.status(200).json({
        message: "Authorized"
    });
}
const register = async (req: Request, res: Response, next: NextFunction) => {
    const user: userModel = req.body;

    bcryptjs.hash(user.password, 10, (hashError, hash) => {
        if (hashError){
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            })
        }
    });
}
const login = async (req: Request, res: Response, next: NextFunction) => {
    
}
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all samples.');

    //  Call to service layer
    const result = await userService.retrieveSample();

    // Return a response to client.
    return res.json(result);
};
export default {validateToken, register, login, getAllUsers};


