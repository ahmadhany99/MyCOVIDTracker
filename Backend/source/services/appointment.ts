
import { appointmentModel } from "../models/appointment";
import * as appointment from "../repositories/appointment";
import bcryptjs from 'bcryptjs';
import logging from "../config/logging";


const NAMESPACE = 'appointment/service';



//Method to create an appointment
const createAppointment = (app: appointmentModel) => {

        return appointment.createAppointment(app);

}

//Method to get all appointments of a patient
const getAppointments = (app: appointmentModel) => {

        return appointment.getAppointments(app);

}

//Method to update an appointment
const updateAppointment = async (app: appointmentModel) => {
        //Check if the appointment already exists in the database
        var appointmentExists = await appointment.checkIfAppointmentExists(app);
        //Throw an error if the appointment doesn't exist in the database 
        if (appointmentExists[0] == undefined) {
                return false;
        } else{

                var appointmentcreates = await appointment.updateAppointment(app);
                return true;
           
        }

}

export {
        createAppointment,
        getAppointments,
        updateAppointment
};
