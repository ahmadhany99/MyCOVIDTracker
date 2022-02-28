import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as userService from '../services/user';
import { userModel } from '../models/user';
import signJWT from '../functions/signJWT';



const NAMESPACE = 'User';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validated, user authorized.");

    return res.status(200).json({
        message: "Authorized"
    });
}
const register = async (req: Request, res: Response, next: NextFunction) => {
    const user: userModel = req.body;
    logging.info(NAMESPACE, 'Creating user.');

    //  Data Transfer Object (DTO)
    const userDTO: userModel = req.body;
    
    //  Todo: Insert middleware isUserValid = validators.user(reqBody) instead of following
    try{
        if (!userDTO.firstName || !userDTO.firstName){
            return res.status(400).json({
                status: 400,
                message: "Missing username or password"
            })
        }
        
        //  Call to service layer
        const result = await userService.register(userDTO);

        // Return a response to client.
        return res.json(user);

    } catch(e){
        return res.status(500).json(e);
    }

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


