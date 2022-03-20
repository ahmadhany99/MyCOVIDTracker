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
exports.getAllDoctors = exports.deleteAccount = exports.getAccount = exports.createAccount = exports.login = void 0;
const account = __importStar(require("../repositories/account"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logging_1 = __importDefault(require("../config/logging"));
const testflags_1 = require("../testflags");
const NAMESPACE = 'account/service';
const login = (acc) => __awaiter(void 0, void 0, void 0, function* () {
    var data = yield account.getPasswordByUsername(acc);
    logging_1.default.debug(NAMESPACE, "this pw = ", acc.password);
    logging_1.default.debug(NAMESPACE, "stored pw = ", data[0].password);
    const result = yield bcryptjs_1.default.compare(acc.password, data[0].password).then((isEqual) => {
        logging_1.default.debug(NAMESPACE, "isEqual = ", isEqual);
        return isEqual;
    });
    logging_1.default.debug(NAMESPACE, "result = ", result);
    return result;
});
exports.login = login;
const createAccount = (acc) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if the username or email already exists in the database
    var username = yield account.checkIfUsernameExists(acc);
    var email = yield account.checkIfEmailExists(acc);
    if (username[0] == undefined && email[0] == undefined) {
        bcryptjs_1.default.hash(acc.password, 10)
            .then((hash) => {
            account.createAccount(acc, hash, '10')
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
    else {
        //If username of email already exists, throw error
        logging_1.default.error(NAMESPACE, "username already exists");
        throw ("Username or email already exists.");
    }
});
exports.createAccount = createAccount;
//Method to delete an account
const deleteAccount = (acc) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.debug(NAMESPACE, 'deleting account ', acc.username);
    return account.deleteAccountByUsername(acc);
});
exports.deleteAccount = deleteAccount;
//Method to get an account
const getAccount = (acc) => {
    if (acc.username != null) {
        return account.getAccountByUsername(acc);
    }
    if (testflags_1.GETACCOUNTTESTINGMODE == true) {
        return account.getAllAccount();
    }
    else {
        throw (new Error("No username specified"));
    }
    throw (new Error("No username specified"));
};
exports.getAccount = getAccount;
//Method to get all doctors 
const getAllDoctors = () => {
    return account.getAllDoctors();
};
exports.getAllDoctors = getAllDoctors;
