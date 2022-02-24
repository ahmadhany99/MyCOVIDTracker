import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import config from '../config/config'
import jwt from 'jsonwebtoken';

const NAMESPACE = "Auth";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Validating Token');

    const token = req.headers.authorization?.split(' ')[1];

    if (token) 
    {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error)
            {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            }
            else
            {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else
    {
        return res.status(401).json({
            messsage: 'Unauthorized'
        });
    }
}

export default extractJWT