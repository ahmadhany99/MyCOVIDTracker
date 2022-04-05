/*
Should:
- Contain business logic
- Leverage data access layer to interact with database
- Be framework agnostic
Should not:
- Be provided req or req objects
- Handle responding to clients
- Provide anything related to HTTP transport layer: status codes, headers...
- Directly interact with database
*/

import { statusModel } from "../models/status";
import * as statusDB from "../repositories/status";
import logging from "../config/logging";

const NAMESPACE = 'status/service';

function today() {
        return new Date().toISOString().slice(0, 10);
}

const updateStatus = async (statusDTO: statusModel) => {
        logging.info(NAMESPACE, "Updating Status");

        // verify patientID not null
        if (statusDTO.patientID == undefined) {
                throw new Error("uid undefined");
        }
        // if date null set to today
        if (statusDTO.date == undefined) {
                //throw new Error("date undefined");
                statusDTO.date = today();
        }

        // search for an existing status for specified user and date
        const status = await statusDB.getStatusByUserAndDate(statusDTO.patientID, statusDTO.date);
        if (status[0] != undefined) {
                logging.info(NAMESPACE, "existing status found, updating status");
                return statusDB.updateStatus(status[0].statusID, statusDTO.report);
        }
        else {
                logging.info(NAMESPACE, "creating new status entry");
                return statusDB.createStatus(statusDTO);
        }
}

const getStatus = async (statusDTO: statusModel) => {
        logging.info(NAMESPACE, "Fetching Status");

        // throw error if uid not specified
        if (statusDTO.patientID == undefined) {
                throw new Error("uid undefined");
        }
        // throw error if date not specified
        if (statusDTO.date == undefined) {
                throw new Error("date undefined");
        }

        const result = await statusDB.getStatusByUserAndDate(statusDTO.patientID, statusDTO.date);
        logging.debug(NAMESPACE, "result: ", result);

        if (result[0] == undefined) {
                throw new Error("no status");
        }
        return result;
}

const getAllStatus = async (statusDTO: statusModel) => {
        logging.info(NAMESPACE, "Fetching All Status in DB");
        
        const result = await statusDB.getAllStatus();
        logging.debug(NAMESPACE, "result: ", result);
        return result;
}

const getStatusByPatient = async (statusDTO: statusModel) => {
        logging.info(NAMESPACE, "Fetching All Status for User "+statusDTO.patientID);

        // throw error if uid not specified
        if (statusDTO.patientID == undefined) {
                throw new Error("uid undefined");
        }

        // fetch status associated to user
        const result = await statusDB.getStatusByUser(statusDTO.patientID);
        logging.debug(NAMESPACE, "result: ", result);

        if (result[0] == undefined) {
                throw new Error("no status");
        }
        return result;
}

const getStatusByDate = async (statusDTO: statusModel) => {
        logging.info(NAMESPACE, "Fetching All Status for User "+statusDTO.patientID);

        // throw error if uid not specified
        if (statusDTO.date == undefined) {
                throw new Error("date undefined");
        }

        // fetch status associated to user
        const result = await statusDB.getStatusByDate(statusDTO.date);
        logging.debug(NAMESPACE, "result: ", result);

        if (result[0] == undefined) {
                throw new Error("no status");
        }
        return result;
}

const deleteStatus = async (statusDTO: statusModel) => {
        logging.info(NAMESPACE, "Deleting Status");

        const status = await statusDB.getStatusByUserAndDate(statusDTO.patientID, statusDTO.date);

        if (status[0] == undefined) {
                throw new Error("no status")
        }
        statusDB.deleteStatus(status[0].statusID);
}

export {
        updateStatus,
        deleteStatus,

        getStatus,
        getAllStatus,
        getStatusByPatient,
        getStatusByDate
    }
