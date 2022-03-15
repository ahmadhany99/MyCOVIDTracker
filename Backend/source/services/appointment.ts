
import { appointmentModel } from "../models/appointment";
import * as appointment from "../repositories/appointment";
import bcryptjs from 'bcryptjs';
import logging from "../config/logging";


const NAMESPACE = 'appointment/service';




const createAppointment = (app: appointmentModel) => {

        return appointment.createAppointment(app);

}

const getAppointments = (app: appointmentModel) => {

        return appointment.getAppointments(app);

}

const updateAppointment = (app: appointmentModel) => {

        return appointment.updateAppointment(app);

}

export {
        createAppointment,
        getAppointments,
        updateAppointment
};
