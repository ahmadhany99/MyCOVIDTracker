import {flaggingModel} from "../models/flagging";
import * as flagging from "../repositories/flagging";
import logging from "../config/logging";
import { patient } from "../models/patient";

const NAMESPACE = 'flagging/service';


const flagPatient = (app: flaggingModel) => {

        return flagging.flagPatient(app);

}

const unflagPatient = (app: flaggingModel) => {

        return flagging.unflagPatient(app);

}

const getFlaggedPatients = (app: flaggingModel) => {

        return flagging.getFlaggedPatients(app);

}

export {
    flagPatient,
    getFlaggedPatients,
    unflagPatient
};