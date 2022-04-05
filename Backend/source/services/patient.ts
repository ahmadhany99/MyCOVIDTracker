import {patient} from "../models/patient";
import {accountModel} from "../models/account";
import * as patientRep from "../repositories/patient";
import logging from "../config/logging";
import quarantine from "../controllers/quarantine";

const NAMESPACE = 'patient/service';


const countAllPatients = (patient: patient) => {

        return patientRep.countAllPatients(patient);

}

const getPatient = async (patient: patient) => {
        var patientID = await patientRep.checkIfPatientExistsInPatient(patient);
         if(patientID[0] != undefined){
        return patientRep.getPatient(patient);
         }
          else{
        logging.error(NAMESPACE, "This patient is not in patient table");
        throw("This patient does not exist");
    }

}


const getDoctor = async (patient: patient) => {
        var patientID = await patientRep.checkIfPatientExistsInPatient(patient);
         if(patientID[0] != undefined){
        return patientRep.getDoctor(patient);
         }
          else{
        logging.error(NAMESPACE, "This patient is not in patient table");
        throw("This patient does not exist");
    }

}



export {
    getPatient,
    countAllPatients,
    getDoctor
};