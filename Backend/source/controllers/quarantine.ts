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
import signJWT from '../functions/signJWT';

const NAMESPACE = 'Quarantine';


/**
   * Executes the inputStartTime function from services/quarantine passing the quarantine model 
   * as parameter
   * Returns status of 200 if done successfully
   */
const inputStartTime = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Entering Start Time');

    const quarantine: quarantine = req.body;
    const patient : patient = req.body;

    try{
        const result = await quarantineService.inputStartTime(quarantine, patient);

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
   * Executes the calculateDaysLeft function from services/quarantine passing the quarantine model 
   * as parameter
   * Returns status of 200 if done successfully and a custom message
   * Otherwise, catches the error and returns status of 500
   */
const calculateDaysLeft = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Calculating days left to quarantine');

    const quarantineDTO: quarantine = req.body;
    const patientDTO : patient = req.body;

    try{
        const result = await quarantineService.calculateDaysLeft(quarantineDTO, patientDTO);

            //Return a response to the client.
            return res.status(200).json({
                status: 200,
                message: "The number of days left to the quarantine has been updated"
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
    const patientDTO : patient = req.body;

    try{
        const result = await quarantineService.getRemainingDays(quarantineDTO, patientDTO);

         return res.json(result);

            //Return a response to the client.
            return res.status(200).json({
                status: 200,
                message: "Getting the days left to quarantine"
            })
    }
    catch(err){
        return res.status(500).json(err);
    }
}




export default{
    inputStartTime,
    calculateDaysLeft,
    getRemainingDays
};