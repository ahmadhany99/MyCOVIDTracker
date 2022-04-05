import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as flaggingService from '../services/flagging';
import { flaggingModel } from '../models/flagging';

const NAMESPACE = 'Flagging';

/**
 * Executes the flagPatient function from services/flagging passing the flagging model
 * as parameter
 * Returns status of 200 if done successfully
 */
const flagPatient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Flag Patient');

    const flaggingDTO: flaggingModel = req.body;

    try {
        await flaggingService.flagPatient(flaggingDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: 'Patient Flagged.'
        });
    } catch (err) {
        // returns error if deemed unsuccessful
        return res.status(500).json(err);
    }
};

/**
 * Executes the getFlaggedPatients function from services/flagging passing the flagging model
 * as parameter
 * Returns status of 200 if done successfully
 */
const getFlaggedPatients = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get Flagged Patients');

    const flaggingDTO: flaggingModel = req.body;

    try {
        const result = await flaggingService.getFlaggedPatients(flaggingDTO);

        return res.json(result);
        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: 'Flagged Patients Returned.'
        });
    } catch (err) {
        // returns error if deemed unsuccessful
        return res.status(500).json(err);
    }
};

export default {
    flagPatient,
    getFlaggedPatients
};
