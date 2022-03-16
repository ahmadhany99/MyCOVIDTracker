
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
const updateAppointment = (app: appointmentModel) => {

        return appointment.updateAppointment(app);

}

export {
        createAppointment,
        getAppointments,
        updateAppointment
};
