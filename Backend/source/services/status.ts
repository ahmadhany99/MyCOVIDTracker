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
import * as db from "../repositories/status";
import logging from "../config/logging";
import { GETALLSTATUSTESTINGMODE } from "../testflags";

const NAMESPACE = 'status/service';

const updateStatus = async (status: statusModel) => {
        logging.info(NAMESPACE, "Updating Status")

        // throw error if uid not specified
        if (status.uid == null) {
                throw new Error("uid undefined")
        }
        // use today's date if date not specified
        // #TODO separate this into a separate function for reuse
        if (status.date == null) {
                status.date = new Date().toISOString().slice(0, 10);
        }

        // search for an existing status for specified user and date
        db.getStatusByUserAndDate(status).then((result) => {
                // if none found, create new
                if (result[0] == null) {
                        logging.debug(NAMESPACE, "no existing status found for u:"+status.uid+" and date:"+status.date)
                        return db.createStatus(status);
                }
                // if existing status, edit existing
                else {
                        logging.debug(NAMESPACE, "existing status found for u:"+status.uid+" and date:"+status.date+"\n", result)
                        return db.updateStatus(status);
                }
        })
}

const deleteStatus = async (status: statusModel) => {
        logging.info(NAMESPACE, "Deleting Status");

        // throw error if uid not specified
        if (status.uid == null) {
                throw new Error("uid undefined")
        }
        // throw error if date not specified
        if (status.date == null) {
                throw new Error("date undefined")
        }

        logging.debug(NAMESPACE, "u:"+status.uid+", d:"+status.date);
        return db.deleteStatus(status);
}

const getStatus = async (status: statusModel) => {
        logging.info(NAMESPACE, "Fetching Status");

        // throw error if uid not specified
        if (status.uid == null) {
                throw new Error("uid undefined")
        }
        // throw error if date not specified
        if (status.date == null) {
                throw new Error("date undefined")
        }

        const result = await db.getStatusByUserAndDate(status);
        logging.debug(NAMESPACE, "result: ", result);
        return result;
}

const getAllStatus = async (status: statusModel) => {

        // if no user specified in testing mode -> returns all statuses in db
        if (status.uid == null && GETALLSTATUSTESTINGMODE == true) {
                logging.info(NAMESPACE, "Fetching All Status in DB");
                const result = await db.getAllStatus();
                logging.debug(NAMESPACE, "result: ", result);
                return result;
        }
        else {
                // throw error if uid not specified
                if (status.uid == null) {
                        throw new Error("uid undefined")
                }
                logging.info(NAMESPACE, "Fetching All Status for u:"+status.uid);
                const result = await db.getStatusByUser(status);
                logging.debug(NAMESPACE, "result: ", result);
                return result;
        }
}

export {
        updateStatus,
        deleteStatus,
        getStatus,
        getAllStatus
    }
