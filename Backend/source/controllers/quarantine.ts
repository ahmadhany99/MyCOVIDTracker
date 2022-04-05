/**
 * @fileoverview 
 * Controllers for quarantine handling the quarantine routes callback functions
 * @package
 */
import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as quarantineService from '../services/quarantine';
import { quarantine } from '../models/quarantine';
import {patient} from '../models/patient';


const NAMESPACE = 'Quarantine';


/**
   * Executes the inputStartTime function from services/quarantine passing the quarantine model 
   * as parameter
   * Returns status of 200 if done successfully
   */
const inputStartDate = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Entering Start Time');

    const quarantineDTO: quarantine = req.body;

    try{
        await quarantineService.inputStartDate(quarantineDTO);

            //Return a response to the client.
            return res.status(200).json({
                status: 200,
                message: "Start date time has been entered successfully"
            })
    }
    catch(err){
        return res.status(500).json(err);
    }
}

const inputEndDate = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Entering Start Time');

    const quarantineDTO: quarantine = req.body;

    try{
        await quarantineService.inputEndDate(quarantineDTO);

            //Return a response to the client.
            return res.status(200).json({
                status: 200,
                message: "Start date time has been entered successfully"
            })
    }
    catch(err){
        return res.status(500).json(err);
    }
}

/**
   * Executes the getRemainingDays function from services/quarantine passing the quarantine model 
   * as parameter
   * Returns the result as a json
   */
const getRemainingDays = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting days left to quarantine');

    const quarantineDTO: quarantine = req.body;

    try{
        const result = await quarantineService.getRemainingDays(quarantineDTO);

        //Return a response to the client.
        return res.status(200).json({
            status: 200,
            message: "Getting the days left to quarantine",
            daysRemaining: result
        })
    }
    catch(err){
        return res.status(500).json(err);
    }
}

//Sets isQuarantined to true for the patient
const setQuarantineTrue = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Setting isQuaratined to true for a Patient');

    const patientDTO : patient = req.body;

    try{
        await quarantineService.setQuarantineTrue(patientDTO);


            //Return a response to the client.
            return res.status(200).json({
                status: 200,
                message: "Setting the isQuarantined to true"
            })
    }
    catch(err){
        return res.status(500).json(err);
    }
}




export default{
    inputStartDate,
    inputEndDate,
    getRemainingDays,
    setQuarantineTrue
};