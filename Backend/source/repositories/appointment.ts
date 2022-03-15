import { appointmentModel } from '../models/appointment';
import { queryDatabase } from '../DatabaseServices';
import { loginDTO } from '../models/loginDTO';
import logging from '../config/logging';

const NAMESPACE = 'account/repository';

const createAppointment = (appointment: appointmentModel) => {
    const query = `INSERT INTO appointment VALUES (appointmentID, ${appointment.patientID}, ${appointment.doctorID},"${appointment.appointmentDate}", "${appointment.description}")`;
    return queryDatabase(query);
}

const getAppointments = (appointment: appointmentModel) => {   
    const query = `SELECT * FROM appointment WHERE patientID="${appointment.patientID}" `;
    return queryDatabase(query);
}

const updateAppointment = (appointment: appointmentModel) => {
    const query = `UPDATE appointment SET doctorID= ${appointment.doctorID}, appointmentDate="${appointment.appointmentDate}",description="${appointment.description}" WHERE appointmentID=${appointment.appointmentID}`;
    return queryDatabase(query);
}



export {
    createAppointment,
    getAppointments,
    updateAppointment
};


