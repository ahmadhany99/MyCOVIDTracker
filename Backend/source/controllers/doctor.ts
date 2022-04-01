import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as doctorService from '../services/doctor';
import { doctorModel } from '../models/doctor';
import { accountModel } from '../models/account';

const NAMESPACE = 'Doctor';

const getDoctor = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting a Doctor info');

    const accountDTO: accountModel = req.body;

    try {
        const result = await doctorService.getDoctor(accountDTO);
        return res.json(result);
    } catch (err) {
        // returns error if deemed unsuccessful
        return res.status(500).json(err);
    }
};

const countAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Counting All Doctors');

    const doctorDTO: doctorModel = req.body;

    try {
        const result = await doctorService.countAllDoctors(doctorDTO);
        return res.json(result);
    } catch (err) {
        // returns error if deemed unsuccessful
        return res.status(500).json(err);
    }
};

const getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Retrieving Account from Database');

    //  Data Transfer Object (DTO)
    const doctorDTO: doctorModel = req.body;

    try {
        //  Call to service layer
        const result = await doctorService.getAllDoctors();

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
};

export default { getDoctor, countAllDoctors, getAllDoctors };
