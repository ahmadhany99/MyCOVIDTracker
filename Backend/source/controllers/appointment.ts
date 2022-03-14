import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as appointmentService from '../services/appointment';
import { appointmentModel } from '../models/appointment';
import signJWT from '../functions/signJWT';



const NAMESPACE = 'Appointment';


const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create Appointment');

    const appointmentDTO: appointmentModel = req.body;

    try {
        const result = await appointmentService.createAppointment(appointmentDTO);

                // Return a response to client.
                return res.status(200).json({
                    status: 200,
                    message: "Appointment Created."
                })
    }
    catch (err) {
        return res.status(500).json(err);
    }

}

const updateAppointment = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create Appointment');

    const appointmentDTO: appointmentModel = req.body;

    try {
        const result = await appointmentService.updateAppointment(appointmentDTO);

                // Return a response to client.
                return res.status(200).json({
                    status: 200,
                    message: "Appointment Updated."
                })
    }
    catch (err) {
        return res.status(500).json(err);
    }

}

const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Retrieving Appointments from Database');


    //  Data Transfer Object (DTO)
    const appointmentDTO: appointmentModel = req.body;

    try{
        
        //  Call to service layer
        const result = await appointmentService.getAppointments(appointmentDTO);

        // Return a response to client.
        return res.json(result);

    } catch(e){
        return res.status(500).json(e);
    }

}


export default {
    createAppointment,
    getAppointments,
    updateAppointment
};


