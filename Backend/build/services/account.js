"use strict";
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
exports.deleteAccount = exports.getDoctorAccounts = exports.getPatientAccounts = exports.getAccount = exports.createAccountAdmin = exports.createAccount = exports.loginAccountAdmin = exports.loginAccount = void 0;
const accountdb = __importStar(require("../repositories/account"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logging_1 = __importDefault(require("../config/logging"));
const testflags_1 = require("../testflags");
const NAMESPACE = 'account/service';
// Create Account Service
const createAccount = (acc) => __awaiter(void 0, void 0, void 0, function* () {
    // verify account obj has necessary fields
    if (acc.email == undefined || acc.email == null || acc.email == "") {
        throw new Error("email is null");
    }
    if (acc.password == undefined || acc.password == null || acc.password == "") {
        throw new Error("password is null");
    }
    //Check if the email already exists in the database
    var emailexists = yield accountdb.getAccountByEmail(acc.email);
    if (emailexists[0] != undefined) {
        logging_1.default.error(NAMESPACE, "email already used by existing account in db");
        throw new Error("account exist");
    }
    else {
        // hash password
        bcryptjs_1.default.hash("" + acc.password, 10)
            .then((hash) => {
            acc.password = hash;
            // create new account
            accountdb.createAccount(acc)
                .then(() => {
                logging_1.default.debug(NAMESPACE, "new account added successfully");
            })
                .catch((error) => {
                logging_1.default.error(NAMESPACE, "error while creating account");
                throw (error);
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, "error while hashing password");
            throw (error);
        });
    }
});
exports.createAccount = createAccount;
// Create Account Service for Admin
const createAccountAdmin = (acc) => __awaiter(void 0, void 0, void 0, function* () {
    // verify account obj has necessary fields
    if (acc.email == undefined || acc.email == null || acc.email == "") {
        throw new Error("email is null");
    }
    if (acc.password == undefined || acc.password == null || acc.password == "") {
        throw new Error("password is null");
    }
    if (acc.userType == undefined || acc.userType == null) {
        throw new Error("type is null");
    }
    //Check if account already exists
    var exists = yield accountdb.getAccountByEmail(acc.email);
    if (exists[0] != undefined) {
        logging_1.default.error(NAMESPACE, "email already exists in db");
        throw new Error("account exist");
    }
    else {
        //hash password
        bcryptjs_1.default.hash("" + acc.password, 10)
            .then((hash) => {
            acc.password = hash;
            //create account
            accountdb.createAccountWithID(acc)
                .then(() => {
                logging_1.default.debug(NAMESPACE, "new account added successfully");
            })
                .catch((error) => {
                logging_1.default.error(NAMESPACE, "error while creating account");
                throw (error);
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, "error while hashing password");
            throw (error);
        });
    }
});
exports.createAccountAdmin = createAccountAdmin;
// Login Service
const loginAccount = (acc) => __awaiter(void 0, void 0, void 0, function* () {
    if (acc.email == undefined || acc.email == null || acc.email == "") {
        throw new Error("email is null");
    }
    if (acc.password == undefined || acc.password == null || acc.password == "") {
        throw new Error("password is null");
    }
    //check if user exists
    var exists = yield accountdb.getAccountByEmail(acc.email);
    if (exists[0] == undefined) {
        throw new Error("account does not exist");
    }
    const result = yield bcryptjs_1.default.compare("" + acc.password, "" + exists[0].password).then((isEqual) => {
        logging_1.default.debug(NAMESPACE, "password is ", isEqual ? "true" : "false");
        return isEqual;
    });
    logging_1.default.debug(NAMESPACE, "result = ", result);
    return result;
});
exports.loginAccount = loginAccount;
// Login Service for Admins
const loginAccountAdmin = (acc) => __awaiter(void 0, void 0, void 0, function* () {
    if (acc.email == undefined || acc.email == null || acc.email == "") {
        throw new Error("email is null");
    }
    if (acc.password == undefined || acc.password == null || acc.password == "") {
        throw new Error("password is null");
    }
    //check if user exists
    var exists = yield accountdb.getAccountByEmail(acc.email);
    if (exists[0] == undefined) {
        throw new Error("account does not exist");
    }
    if (exists[0].userType == 1) {
        throw new Error("account is not admin");
    }
    const result = yield bcryptjs_1.default.compare("" + acc.password, "" + exists[0].password).then((isEqual) => {
        logging_1.default.debug(NAMESPACE, "password is right = ", isEqual);
        return isEqual;
    });
    logging_1.default.debug(NAMESPACE, "result = ", result);
    return result;
});
exports.loginAccountAdmin = loginAccountAdmin;
//Delete Account Service
const deleteAccount = (acc) => __awaiter(void 0, void 0, void 0, function* () {
    //check if email specified
    if (acc.email == undefined || acc.email == null || acc.email == "") {
        throw new Error("email is null");
    }
    //check if account exist
    const exists = yield accountdb.getAccountByEmail(acc.email);
    if (exists[0] == undefined) {
        throw new Error("account does not exist");
    }
    return accountdb.deleteAccountByEmail(exists[0].email);
});
exports.deleteAccount = deleteAccount;
//Fetch Account Service (#TODO why do we need this again aside from testing?)
const getAccount = (acc) => __awaiter(void 0, void 0, void 0, function* () {
    //check if in testing mode
    if (testflags_1.ACCOUNTTESTINGMODE && acc.email == undefined) {
        return accountdb.getAllAccount();
    }
    else {
        const results = yield accountdb.getAccountByEmail(acc.email);
        //check if email specified
        if (acc.email == undefined || acc.email == null || acc.email == "") {
            throw new Error("email is null");
        }
        if (results[0] == undefined) {
            throw new Error("account does not exist");
        }
        return results;
    }
});
exports.getAccount = getAccount;
const getPatientAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    return accountdb.getAccountByTypePatient();
});
exports.getPatientAccounts = getPatientAccounts;
const getDoctorAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    return accountdb.getAccountByTypeDoctor();
});
exports.getDoctorAccounts = getDoctorAccounts;
