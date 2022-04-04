import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as patientService from '../services/patient';
import { patient } from '../models/patient';
import { accountModel } from '../models/account';



const NAMESPACE = 'Patient';

const getPatient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting a Patient info');

    const patientDTO : patient = req.body;

    try {
        const result = await patientService.getPatient(patientDTO);
        return res.json(result);

    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }

}


const countAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Counting All Patients');

    const patientDTO: patient = req.body;

    try {
        const result = await patientService.countAllPatients(patientDTO);
        return res.json(result);

    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }

}

const getDoctor = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting the patient doctor');

    const patientDTO : patient = req.body;

    try {
        const result = await patientService.getDoctor(patientDTO);
        return res.json(result);

    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }

}

export default{
    getPatient,
    countAllPatients,
    getDoctor
};
