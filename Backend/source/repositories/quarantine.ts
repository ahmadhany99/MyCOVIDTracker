/**
 * @fileoverview 
 * Repositories for the quarantine feature
 * Handles all the operations of the database: INSERT, SELECT, UPDATE
 * @package
 */

import { quarantine } from '../models/quarantine';
import {patient} from '../models/patient'
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';
import quarantineController from '../controllers/quarantine';

const NAMESPACE = 'quarantine/repository';

/**
   * Inserts an input start time in the database for the quarantine table
   * The value for the column daysleft is null
   * PatientID must exist in the patient table before running the following query
   */
const inputStartDate = (quarantine: quarantine ) =>{
    const query = `UPDATE quarantine SET quarantine.startDate = '${quarantine.startDate}' WHERE quarantine.patientID = '${quarantine.patientID}'`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown;
}


const inputEndDate = (quarantine: quarantine ) =>{
    const query = `UPDATE quarantine SET quarantine.endDate = "${quarantine.endDate}" WHERE quarantine.patientID = "${quarantine.patientID}"`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown;
}

/**
   * Selects the value from daysleft converted to seconds
   * PatientID must exist in the patient table before running the following query
   */
const getRemainingDays = (quarantine: quarantine ) =>{
    const query = `SELECT daysLeft FROM quarantine WHERE quarantine.patientID =  "${quarantine.patientID}"`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown;
}

//Selects everything from the patient table given a patientID
//This query is essentially to check if the patient exists
const checkIfPatientExists = (quarantine : quarantine) =>{
    const query = `SELECT * FROM quarantine WHERE quarantine.patientID = "${quarantine.patientID}"`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as patient[];
}

const checkIfPatientExistsInPatient = (patient : patient) =>{
    const query = `SELECT * FROM patient WHERE patientID = "${patient.patientID}"`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as patient[];
}

const setQuarantineTrue = (patient : patient) =>{
    const query = `UPDATE patient SET isQuarantined = 1 WHERE patientID = '${patient.patientID}'`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as patient[];
}




export{
    inputStartDate,
    inputEndDate,
    getRemainingDays,
    checkIfPatientExists,
    checkIfPatientExistsInPatient,
    setQuarantineTrue
};
