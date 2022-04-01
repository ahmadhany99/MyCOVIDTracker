import { appointmentModel } from '../models/appointment';
import { queryDatabase } from '../DatabaseServices';

const NAMESPACE = 'account/repository';

//Create an appointment in table appointment with the passed appointmentModel
const createAppointment = (appointment: appointmentModel) => {
    const query = `INSERT INTO appointment VALUES (appointmentID, ${appointment.patientID}, ${appointment.doctorID},"${appointment.appointmentDate}", "${appointment.description}")`;
    return queryDatabase(query);
};

//Get all appointments from database based on the passed patientID
const getAppointments = (appointment: appointmentModel) => {
    const query = `SELECT * FROM appointment WHERE patientID="${appointment.patientID}" `;
    return queryDatabase(query);
};

//Update an appointment that already exists in the database based on the passed appointmentID
const updateAppointment = (appointment: appointmentModel) => {
    const query = `UPDATE appointment SET doctorID= ${appointment.doctorID}, appointmentDate="${appointment.appointmentDate}",description="${appointment.description}" WHERE appointmentID=${appointment.appointmentID}`;
    return queryDatabase(query);
};

//Check if appointment already exists in database
const checkIfAppointmentExists = (appointment: appointmentModel) => {
    const query = `SELECT * FROM appointment WHERE appointmentID="${appointment.appointmentID}" `;
    return queryDatabase(query) as unknown as appointmentModel[];
};

export { createAppointment, getAppointments, updateAppointment, checkIfAppointmentExists };
