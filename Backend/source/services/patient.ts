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

const getCovidStatus = async (patient: patient) => {
    var patientID = await patientRep.checkIfPatientExistsInPatient(patient);
    if(patientID[0] == undefined) {
        throw("Patient does not exist");
    }
    else {
        const result = await patientRep.getCovidStatus(patient.patientID);


        if (result[0].covidStatus.readInt8() == 1) {
            return true;
        }
        else {
            return false;
        }
    }
}

const getAllCovidPos = async (patient: patient) => {
    const result = await patientRep.getCovidPosCount(patient.patientID);
    logging.debug(NAMESPACE, "result:", result[0].count);
    return result[0].count;
}

const setCovidStatus = async (patient: patient) => {
    var patientID = await patientRep.checkIfPatientExistsInPatient(patient);
    if(patientID[0] == undefined) {
        throw("Patient does not exist");
    }
    else {
         return patientRep.setCovidStatus(patient.patientID, patient.covidStatus);
    }
}

export {
    getPatient,
    countAllPatients,
    getDoctor,

    getCovidStatus,
    getAllCovidPos,
    setCovidStatus
};