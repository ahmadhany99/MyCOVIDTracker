import { doctorModel as doctordb } from '../models/doctor';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';
import { patient } from '../models/patient';

const NAMESPACE = 'doctor/repository';


// Get all doctors from db. A doctor is an account with 2 as a typeId
const getAccountByTypeDoctor = () => {
    const query = `SELECT * FROM account WHERE userType=2`;
    return queryDatabase(query) as unknown as doctordb[];
}

// Get the count of all doctors in table doctor
const getDoctorsCount = () => {
    const query = `SELECT COUNT(*) as DoctorsCount FROM doctor`;
    return queryDatabase(query);
}

// Get the count of patients from table patient with a specific doctorID
const getDoctorsNumberOfPatients = (patient: patient) => {
    const query = `SELECT COUNT(*) as PatientsCount FROM patient where patient.doctorID = "${patient.doctorID}"`;
    return queryDatabase(query);
}

// Get the information of patients from table patient and account with a specific doctorID
const getDoctorsPatientsInfo = (patient: patient) => {
    const query = `SELECT * FROM account INNER JOIN patient ON account.accountID=patient.patientID WHERE patient.doctorID = "${patient.doctorID}"`;
    return queryDatabase(query);
}

// Get the information of a doctor from table doctor and account with a specific doctorID
const getDoctorsInfo = (doctorModel: doctordb) => {
    const query = `SELECT * FROM account INNER JOIN doctor ON account.accountID=doctor.doctorID WHERE doctor.doctorID = "${doctorModel.doctorID}"`;
    return queryDatabase(query);
}

// Check if a doctor exists in table doctor based on a specific doctorID
const checkIfDoctorExists = (doctorID : number) =>{
    const query = `SELECT * FROM doctor WHERE doctor.doctorID = "${doctorID}"  `;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as doctordb[];
}

// Change the doctor active status in table doctor
const changeDoctorActiveStatus = (doctorModel: doctordb) => {

    var query = `UPDATE doctor set IsActive=true WHERE doctor.doctorID = "${doctorModel.doctorID}"`;
    if(!doctorModel.IsActive){
        query = `UPDATE doctor set IsActive=false WHERE doctor.doctorID = "${doctorModel.doctorID}"`;
    }
    return queryDatabase(query);
}

// set the assign doctorID in table patient for a patient
const assignDoctorToPatient = (patient: patient) => {
    const query = `UPDATE patient set doctorID = "${patient.doctorID}" WHERE patient.patientID = "${patient.patientID}"`;
    return queryDatabase(query);
}

export {
    
    getAccountByTypeDoctor,
    getDoctorsCount,
    getDoctorsNumberOfPatients,
    checkIfDoctorExists,
    getDoctorsPatientsInfo,
    getDoctorsInfo,
    changeDoctorActiveStatus,
    assignDoctorToPatient

};


