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

import { doctorModel } from '../models/doctor';
import * as doctordb from '../repositories/doctor';
import bcryptjs from 'bcryptjs';
import logging from "../config/logging";
import {patient} from "../models/patient";

const NAMESPACE = 'account/service';


const getDoctorAccounts = async () => {
        return doctordb.getAccountByTypeDoctor();
}

const getDoctorsCount = async () => {

        return doctordb.getDoctorsCount();

}

const getDoctorsNumberOfPatients = async (patient: patient) => {
        //Check if doctor exists before executing the query
        var doctorID = await doctordb.checkIfDoctorExists(patient.doctorID);
         if(doctorID[0] != undefined){
                return doctordb.getDoctorsNumberOfPatients(patient);
         }
          else{
        logging.error(NAMESPACE, "This doctor is not in doctor table");
        throw("This doctor does not exist");
    }

}

const getDoctorsPatientsInfo = async (patient: patient) => {
        //Check if doctor exists before executing the query
        var doctorID = await doctordb.checkIfDoctorExists(patient.doctorID);
         if(doctorID[0] != undefined){
                return doctordb.getDoctorsPatientsInfo(patient);
         }
          else{
        logging.error(NAMESPACE, "This doctor is not in doctor table");
        throw("This doctor does not exist");
    }

}

const getDoctorsInfo = async (doctorModel: doctorModel) => {
        //Check if doctor exists before executing the query
        var doctorID = await doctordb.checkIfDoctorExists(doctorModel.doctorID);
         if(doctorID[0] != undefined){
                return doctordb.getDoctorsInfo(doctorModel);
         }
          else{
        logging.error(NAMESPACE, "This doctor is not in doctor table");
        throw("This doctor does not exist");
    }

}

const changeDoctorActiveStatus = async (doctorModel: doctorModel) => {
        //Check if doctor exists before executing the query
        var doctorID = await doctordb.checkIfDoctorExists(doctorModel.doctorID);
         if(doctorID[0] != undefined){
                return doctordb.changeDoctorActiveStatus(doctorModel);
         }
          else{
        logging.error(NAMESPACE, "This doctor is not in doctor table");
        throw("This doctor does not exist");
    }

}

const assignDoctorToPatient = async ( patient: patient)  => {
        //Check if doctor exists before executing the query
        var doctorID = await doctordb.checkIfDoctorExists(patient.doctorID);
         if(doctorID[0] != undefined){
                return doctordb.assignDoctorToPatient(patient);
         }
          else{
        logging.error(NAMESPACE, "This doctor is not in doctor table");
        throw("This doctor does not exist");
    }

}
export {

        getDoctorAccounts,
        getDoctorsCount,
        getDoctorsNumberOfPatients,
        getDoctorsPatientsInfo,
        getDoctorsInfo,
        changeDoctorActiveStatus,
        assignDoctorToPatient
 
};