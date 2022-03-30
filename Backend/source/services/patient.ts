import {patient} from "../models/patient";
import {accountModel} from "../models/account";
import * as patientRep from "../repositories/patient";
import logging from "../config/logging";
import quarantine from "../controllers/quarantine";

const NAMESPACE = 'patient/service';


const countAllPatients = (patient: patient) => {

        return patientRep.countAllPatients(patient);

}

const getPatient = async (account: accountModel) => {
        var patientID = await patientRep.checkIfPatientExistsInPatient(account);
         if(patientID[0] != undefined){
        return patientRep.getPatient(account);
         }
          else{
        logging.error(NAMESPACE, "This patient is not in patient table");
        throw("This patient does not exist");
    }

}


export {
    getPatient,
    countAllPatients
};