"use strict";
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
const logging_1 = __importDefault(require("../config/logging"));
const statusService = __importStar(require("../services/status"));
const NAMESPACE = 'status/controller';
function handleStatusError(error, res) {
    if (error.message == "uid undefined") {
        return res.status(400).json({
            status: 400,
            message: "patientID has to be assigned a value"
        });
    }
    else if (error.message == "date undefined") {
        return res.status(400).json({
            status: 400,
            message: "date has to be assigned a value"
        });
    }
    else if (error.message == "no status") {
        return res.status(404).json({
            status: 404,
            message: "status report does not exist"
        });
    }
    else {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}
const updateStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Updating Status");
    const status = req.body;
    try {
        yield statusService.updateStatus(status);
        return res.status(200).json({
            status: 200,
            message: "Status Updated Successfully"
        });
    }
    catch (e) {
        const err = e;
        return handleStatusError(err, res);
    }
});
const deleteStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Deleting Status");
    const status = req.body;
    try {
        yield statusService.deleteStatus(status);
        return res.status(200).json({
            status: 200,
            message: "Status Deleted Successfully"
        });
    }
    catch (e) {
        const err = e;
        return handleStatusError(err, res);
    }
});
const getStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.body;
    logging_1.default.info(NAMESPACE, "Fetching Status");
    try {
        const result = yield statusService.getStatus(status);
        return res.status(200).json({
            status: 200,
            message: "success",
            result: result
        });
    }
    catch (e) {
        const err = e;
        return handleStatusError(err, res);
    }
});
const getAllStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.body;
    logging_1.default.info(NAMESPACE, "Fetching All Status");
    try {
        const result = yield statusService.getAllStatus(status);
        return res.status(200).json({
            status: 200,
            message: "success",
            result: result
        });
    }
    catch (e) {
        const err = e;
        return handleStatusError(err, res);
    }
});
const getStatusByPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.body;
    logging_1.default.info(NAMESPACE, "Fetching All Status for Patient " + status.patientID);
    try {
        const result = yield statusService.getStatusByPatient(status);
        return res.status(200).json({
            status: 200,
            message: "Status issued by " + status.patientID,
            result: result
        });
    }
    catch (e) {
        const err = e;
        return handleStatusError(err, res);
    }
});
const getStatusByDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "Fetching All Status for Date");
    const status = req.body;
    try {
        const result = yield statusService.getStatusByDate(status);
        return res.status(200).json({
            status: 200,
            message: "Status issued on " + status.date,
            result: result
        });
    }
    catch (e) {
        const err = e;
        return handleStatusError(err, res);
    }
});
exports.default = {
    updateStatus,
    deleteStatus,
    getStatus,
    getAllStatus,
    getStatusByPatient,
    getStatusByDate
};
