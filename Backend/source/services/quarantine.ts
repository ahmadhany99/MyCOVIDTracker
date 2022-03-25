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
import { patientDTO } from "../models/patientDTO";

const NAMESPACE = 'quarantine/service';

/**
   * Returns the operation of inputStartTime from repositories/quarantine with quarantine model as the parameter
   */
const inputStartTime = async (qtModel : quarantine, patient: patientDTO) =>{
    //Checks if the patient already exists in the patient table in database
    var patientID = await qt.checkIfPatientExists(patient);
    if(patientID[0] != undefined){
     logging.debug(NAMESPACE, "Creating new entry for quarantine:");
     var quarantineInputTime = await qt.inputStartTime(qtModel);
     return true;
    //return qt.inputStartTime(qtModel);
    }
    //if patient does not exist, throw error
    else{
        logging.error(NAMESPACE, "The patient does not exist");
        throw("Error: The patient does not exist");
        return false;
    }
}

/**
   * Returns the operation of calculateDaysLeft from repositories/quarantine with quarantine model as the parameter
   */
const calculateDaysLeft = async (qtModel: quarantine, patient: patientDTO) =>{
    //Checks if the patient already exists in the patient table in database
    var patientID = await qt.checkIfPatientExists(patient);
    if(patientID[0] != undefined){
     logging.debug(NAMESPACE, "editing entry for quarantine id:", qtModel.patientID);
     var quarantineUpdated = await qt.calculateDaysLeft(qtModel);
     return true;
     //return qt.calculateDaysLeft(qtModel);
    }
    //if patient does not exist, throw error
     else{
        logging.error(NAMESPACE, "The patient does not exist");
        throw("The patient does not exist");
    }
}

/**
   * Returns the operation of getRemainingDays from repositories/quarantine with quarantine model as the parameter
   */
const getRemainingDays = async (qtModel: quarantine, patient: patientDTO) =>{
    //Checks if the patient already exists in the patient table in database
     var patientID = await qt.checkIfPatientExists(patient);
      if(patientID[0] != undefined){
     logging.debug(NAMESPACE, "getting entry for quarantine daysLeft:", qtModel.daysLeft);
     var quarantineDays = await qt.getRemainingDays(qtModel);
     return true;
    //return qt.getRemainingDays(qtModel);
      }
      //if patient does not exist, throw error
       else{
        logging.error(NAMESPACE, "The patient does not exist");
        throw("The patient does not exist");
    }
}




export{
    inputStartTime, 
    calculateDaysLeft,
    getRemainingDays
};