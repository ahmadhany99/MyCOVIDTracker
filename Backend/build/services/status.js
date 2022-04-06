"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusByDate = exports.getStatusByPatient = exports.getAllStatus = exports.getStatus = exports.deleteStatus = exports.updateStatus = void 0;
const statusDB = __importStar(require("../repositories/status"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'status/service';
function today() {
    return new Date().toISOString().slice(0, 10);
}
const updateStatus = (statusDTO) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Updating Status");
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
    const status = yield statusDB.getStatusByUserAndDate(statusDTO.patientID, statusDTO.date);
    if (status[0] != undefined) {
        logging_1.default.info(NAMESPACE, "existing status found, updating status");
        return statusDB.updateStatus(status[0].statusID, statusDTO.report);
    }
    else {
        logging_1.default.info(NAMESPACE, "creating new status entry");
        return statusDB.createStatus(statusDTO);
    }
});
exports.updateStatus = updateStatus;
const getStatus = (statusDTO) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Fetching Status");
    // throw error if uid not specified
    if (statusDTO.patientID == undefined) {
        throw new Error("uid undefined");
    }
    // throw error if date not specified
    if (statusDTO.date == undefined) {
        throw new Error("date undefined");
    }
    const result = yield statusDB.getStatusByUserAndDate(statusDTO.patientID, statusDTO.date);
    logging_1.default.debug(NAMESPACE, "result: ", result);
    if (result[0] == undefined) {
        throw new Error("no status");
    }
    return result;
});
exports.getStatus = getStatus;
const getAllStatus = (statusDTO) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Fetching All Status in DB");
    const result = yield statusDB.getAllStatus();
    logging_1.default.debug(NAMESPACE, "result: ", result);
    return result;
});
exports.getAllStatus = getAllStatus;
const getStatusByPatient = (statusDTO) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Fetching All Status for User " + statusDTO.patientID);
    // throw error if uid not specified
    if (statusDTO.patientID == undefined) {
        throw new Error("uid undefined");
    }
    // fetch status associated to user
    const result = yield statusDB.getStatusByUser(statusDTO.patientID);
    logging_1.default.debug(NAMESPACE, "result: ", result);
    if (result[0] == undefined) {
        throw new Error("no status");
    }
    return result;
});
exports.getStatusByPatient = getStatusByPatient;
const getStatusByDate = (statusDTO) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Fetching All Status for User " + statusDTO.patientID);
    // throw error if uid not specified
    if (statusDTO.date == undefined) {
        throw new Error("date undefined");
    }
    // fetch status associated to user
    const result = yield statusDB.getStatusByDate(statusDTO.date);
    logging_1.default.debug(NAMESPACE, "result: ", result);
    if (result[0] == undefined) {
        throw new Error("no status");
    }
    return result;
});
exports.getStatusByDate = getStatusByDate;
const deleteStatus = (statusDTO) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Deleting Status");
    const status = yield statusDB.getStatusByUserAndDate(statusDTO.patientID, statusDTO.date);
    if (status[0] == undefined) {
        throw new Error("no status");
    }
    statusDB.deleteStatus(status[0].statusID);
});
exports.deleteStatus = deleteStatus;
