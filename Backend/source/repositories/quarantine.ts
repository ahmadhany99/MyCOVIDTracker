/**
 * @fileoverview 
 * Repositories for the quarantine feature
 * Handles all the operations of the database: INSERT, SELECT, UPDATE
 * @package
 */

import { quarantine } from '../models/quarantine';
import {patientDTO} from '../models/patientDTO'
import { queryDatabase } from '../DatabaseServices';
import { loginDTO } from '../models/loginDTO';
import logging from '../config/logging';
import account from '../controllers/account';

const NAMESPACE = 'quarantine/repository';

/**
   * Inserts an input start time in the database for the quarantine table
   * The value for the column daysleft is null
   * PatientID must exist in the patient table before running the following query
   */
const inputStartTime = (quarantine: quarantine ) =>{
    const query = `INSERT INTO quarantine VALUES ("${quarantine.patientID}","${quarantine.inQuarantine}", "${quarantine.startTime}",
     "${quarantine.endDate}",null)`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as loginDTO[];
}

/**
   * Updates the quarantine table by finding the date diff between startDate and endDate and adding to daysLeft column
   *PatientID must exist in the patient table before running the following query
   */
const calculateDaysLeft = (quarantine: quarantine ) =>{
    const query = `UPDATE quarantine SET quarantine.daysLeft = DATEDIFF(quarantine.endDate, quarantine.startTime) WHERE quarantine.patientID =
    "${quarantine.patientID}"`;
    logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query);
}

/**
   * Selects the value from daysleft converted to seconds
   * PatientID must exist in the patient table before running the following query
   */
const getRemainingDays = (quarantine: quarantine ) =>{
    const query = `SELECT (quarantine.daysLeft* 86400) as daysLeft FROM quarantine WHERE quarantine.patientID =  "${quarantine.patientID}"`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as loginDTO[];
}

//Selects everything from the patient table given a patientID
//This query is essentially to check if the patient exists
const checkIfPatientExists = (patient : patientDTO) =>{
    const query = `SELECT * FROM patient WHERE patientID = "${patient.patientID}"`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as loginDTO[];
}


export{
    inputStartTime,
    calculateDaysLeft,
    getRemainingDays,
    checkIfPatientExists
};
