"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointment = exports.getAppointments = exports.createAppointment = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const NAMESPACE = 'account/repository';
//Create an appointment in table appointment with the passed appointmentModel
const createAppointment = (appointment) => {
    const query = `INSERT INTO appointment VALUES (appointmentID, ${appointment.patientID}, ${appointment.doctorID},"${appointment.appointmentDate}", "${appointment.description}")`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.createAppointment = createAppointment;
//Get all appointments from database based on the passed patientID
const getAppointments = (appointment) => {
    const query = `SELECT * FROM appointment WHERE patientID="${appointment.patientID}" `;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAppointments = getAppointments;
//Update an appointment that already exists in the database based on the passed appointmentID
const updateAppointment = (appointment) => {
    const query = `UPDATE appointment SET doctorID= ${appointment.doctorID}, appointmentDate="${appointment.appointmentDate}",description="${appointment.description}" WHERE appointmentID=${appointment.appointmentID}`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.updateAppointment = updateAppointment;
