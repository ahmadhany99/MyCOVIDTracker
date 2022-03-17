"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointment = exports.getAppointments = exports.createAppointment = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const NAMESPACE = 'account/repository';
const createAppointment = (appointment) => {
    const query = `INSERT INTO appointment VALUES (appointmentID, ${appointment.patientID}, ${appointment.doctorID},"${appointment.appointmentDate}", "${appointment.description}")`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.createAppointment = createAppointment;
const getAppointments = (appointment) => {
    const query = `SELECT * FROM appointment WHERE patientID="${appointment.patientID}" `;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.getAppointments = getAppointments;
const updateAppointment = (appointment) => {
    const query = `UPDATE appointment SET doctorID= ${appointment.doctorID}, appointmentDate="${appointment.appointmentDate}",description="${appointment.description}" WHERE appointmentID=${appointment.appointmentID}`;
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.updateAppointment = updateAppointment;
