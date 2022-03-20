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
exports.getAllStatus = exports.getStatus = exports.deleteStatus = exports.updateStatus = void 0;
const db = __importStar(require("../repositories/status"));
const logging_1 = __importDefault(require("../config/logging"));
const testflags_1 = require("../testflags");
const NAMESPACE = 'status/service';
const updateStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Updating Status");
    // throw error if uid not specified
    if (status.uid == null) {
        throw new Error("uid undefined");
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
            logging_1.default.debug(NAMESPACE, "no existing status found for u:" + status.uid + " and date:" + status.date);
            return db.createStatus(status);
        }
        // if existing status, edit existing
        else {
            logging_1.default.debug(NAMESPACE, "existing status found for u:" + status.uid + " and date:" + status.date + "\n", result);
            return db.updateStatus(status);
        }
    });
});
exports.updateStatus = updateStatus;
const deleteStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Deleting Status");
    // throw error if uid not specified
    if (status.uid == null) {
        throw new Error("uid undefined");
    }
    // throw error if date not specified
    if (status.date == null) {
        throw new Error("date undefined");
    }
    logging_1.default.debug(NAMESPACE, "u:" + status.uid + ", d:" + status.date);
    return db.deleteStatus(status);
});
exports.deleteStatus = deleteStatus;
const getStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Fetching Status");
    // throw error if uid not specified
    if (status.uid == null) {
        throw new Error("uid undefined");
    }
    // throw error if date not specified
    if (status.date == null) {
        throw new Error("date undefined");
    }
    const result = yield db.getStatusByUserAndDate(status);
    logging_1.default.debug(NAMESPACE, "result: ", result);
    return result;
});
exports.getStatus = getStatus;
const getAllStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    // if no user specified in testing mode -> returns all statuses in db
    if (status.uid == null && testflags_1.GETALLSTATUSTESTINGMODE == true) {
        logging_1.default.info(NAMESPACE, "Fetching All Status in DB");
        const result = yield db.getAllStatus();
        logging_1.default.debug(NAMESPACE, "result: ", result);
        return result;
    }
    else {
        // throw error if uid not specified
        if (status.uid == null) {
            throw new Error("uid undefined");
        }
        logging_1.default.info(NAMESPACE, "Fetching All Status for u:" + status.uid);
        const result = yield db.getStatusByUser(status);
        logging_1.default.debug(NAMESPACE, "result: ", result);
        return result;
    }
});
exports.getAllStatus = getAllStatus;
