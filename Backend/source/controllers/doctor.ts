import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as doctorService from '../services/doctor';
import { doctorModel } from '../models/doctor';
import { patient } from '../models/patient';

const NAMESPACE = 'doctor/controller';

function handleAccountError(err: Error, res: Response) {
    if (err.message == "email is null") {
        return res.status(400).json({
            status: 400,
            message: "Email needs to be assigned a value"
        })
    } else if (err.message == "password is null") {
        return res.status(400).json({
            status: 400,
            message: "Password needs to be assigned a value"
        })
    } else if (err.message == "type is null") {
        return res.status(400).json({
            status: 400,
            message: "User type needs to be assigned a value"
        })
    } else if (err.message == "account is not admin") {
        return res.status(403).json({
            status: 404,
            message: "You do not have permission to access this ressource"
        })
    } else if (err.message == "account does not exist") {
        return res.status(404).json({
            status: 404,
            message: "There is no existing account associated to this email"
        })
    } else if (err.message == "account exist") {
        return res.status(409).json({
            status: 409,
            message: "An account using this email already exists"
        })
    } else {
        return res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const getDoctors = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get Doctor Accounts From Account Table');

    try {
        //  Call to service layer
        const result = await doctorService.getDoctorAccounts();

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: result
        });

    } catch (e) {
        const err = e as Error;
        logging.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
        
    }
}

const getDoctorsCount = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Counting All Doctors');

    try {
        const result = await doctorService.getDoctorsCount();
        return res.json(result);

    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }

}

const getDoctorsNumberOfPatients = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Counting All Doctors');

    const patientDTO: patient = req.body;

    try {
        const result = await doctorService.getDoctorsNumberOfPatients(patientDTO);
        return res.json(result);

    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }

}

const getDoctorsPatientsInfo = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Counting All Doctors');

    const patientDTO: patient = req.body;

    try {
        const result = await doctorService.getDoctorsPatientsInfo(patientDTO);
        return res.json(result);

    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }

}

const getDoctorsInfo = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get doctors info');

    const doctorModel: doctorModel = req.body;

    try {
        const result = await doctorService.getDoctorsInfo(doctorModel);
        return res.json(result);

    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }

}

const changeDoctorActiveStatus = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get doctors info');

    const doctorModel: doctorModel = req.body;

    try {
        const result = await doctorService.changeDoctorActiveStatus(doctorModel);
        return res.json(result);

    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }

}

const assignDoctorToPatient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get patients info');

    const patient: patient = req.body;

    try {
        const result = await doctorService.assignDoctorToPatient(patient);
        return res.json(result);

    }
    // returns error if deemed unsuccessful
    catch (err) {
        return res.status(500).json(err);
    }

}

export default {
    handleAccountError,
    getDoctors,
    getDoctorsCount,
    getDoctorsNumberOfPatients,
    getDoctorsPatientsInfo,
    getDoctorsInfo,
    changeDoctorActiveStatus,
    assignDoctorToPatient
};