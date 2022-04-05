/* Should:
        - Contain business logic
        - Leverage data access layer to interact with database
        - Be framework agnostic
    Should not:
        - Be provided req or req objects
        - Handle responding to clients
        - Provide anything related to HTTP transport layer: status codes, headers...
        - Directly interact with database
*/

import {quarantine} from "../models/quarantine";
import * as qt from "../repositories/quarantine";
import logging from "../config/logging";
import { patient } from "../models/patient";

const NAMESPACE = 'quarantine/service';

/**
   * Returns the operation of inputStartTime from repositories/quarantine with quarantine model as the parameter
   */
const inputStartDate = async (qtModel : quarantine) =>{
    //Checks if the patient already exists in the patient table in database
    var patientID = await qt.checkIfPatientExists(qtModel);
    if(patientID[0] != undefined){
     logging.debug(NAMESPACE, "Creating new entry for quarantine:");
    return qt.inputStartDate(qtModel);
    }
    //if patient does not exist, throw error
    else{
        logging.error(NAMESPACE, "This patient is not in quarantine");
        throw("Error: This patient is not in quarantine");
    }
}

const inputEndDate = async (qtModel : quarantine) =>{
    //Checks if the patient already exists in the patient table in database
    var patientID = await qt.checkIfPatientExists(qtModel);
    if(patientID[0] != undefined){
     logging.debug(NAMESPACE, "Creating new entry for quarantine:");
    return qt.inputEndDate(qtModel);
    }
    //if patient does not exist, throw error
    else{
        logging.error(NAMESPACE, "This patient is not in quarantine");
        throw("Error: This patient is not in quarantine");
    }
}


/**
   * Returns the operation of getRemainingDays from repositories/quarantine with quarantine model as the parameter
   */
const getRemainingDays = async (qtModel: quarantine) =>{
    //Checks if the patient already exists in the patient table in database
     var patientID = await qt.checkIfPatientExists(qtModel);
      if(patientID[0] != undefined){
     logging.debug(NAMESPACE, "getting entry for quarantine daysLeft:", qtModel.daysLeft);
    return qt.getRemainingDays(qtModel);
      }
      //if patient does not exist, throw error
       else{
        logging.error(NAMESPACE, "This patient is not in quarantine");
        throw("This patient is not in quarantine");
    }
}

const setQuarantineTrue = async (patient: patient) => {
         var patientID = await qt.checkIfPatientExistsInPatient(patient);
         if(patientID[0] != undefined){
        return qt.setQuarantineTrue(patient);
      }
       else{
        logging.error(NAMESPACE, "This patient is not in patient table");
        throw("This patient does not exist");
    }
}



export{
    inputStartDate, 
    inputEndDate,
    getRemainingDays,
    setQuarantineTrue
};