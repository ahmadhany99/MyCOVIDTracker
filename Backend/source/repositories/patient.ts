import { patient } from '../models/patient';
import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'patient/repository';


// Get a patient's info given a patient ID
const getPatient = (patient: patient) => {
    const query = `SELECT * FROM patient WHERE patient.patientID = '${patient.patientID}'`;
    return queryDatabase(query);
}

// Count all the patients from the patient table
const countAllPatients = (patient: patient) => {
    const query = `SELECT COUNT(*) as countAllPatients FROM patient`;
    return queryDatabase(query);
}

// Check if the patient exists in the patient table given a patient ID
const checkIfPatientExistsInPatient = (patient : patient) =>{
    const query = `SELECT * FROM patient WHERE patientID = "${patient.patientID}"`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as patient[];
}

// Get the patient's doctor (doctor id) given a patient ID
const getDoctor = (patient: patient) => {
    const query = `SELECT doctorID FROM patient WHERE patient.patientID = '${patient.patientID}'`;
    return queryDatabase(query);
}






export{
    getPatient,
    countAllPatients,
    checkIfPatientExistsInPatient,
    getDoctor
};