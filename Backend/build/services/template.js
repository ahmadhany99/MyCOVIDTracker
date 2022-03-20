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
exports.retrieveSample = exports.register = void 0;
const template_1 = require("../repositories/template");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const NAMESPACE = 'user/service';
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Business Logic
    bcryptjs_1.default.hash(user.firstName, 10, (hashError, hash) => {
        if (hashError) {
            return ({
                message: hashError.message,
                error: hashError
            });
        }
        const userRecord = (0, template_1.create)(user, hash);
        return userRecord;
    });
    // Call to user repository
});
exports.register = register;
const retrieveSample = () => {
    // Business Logic
    // Call Repo
    return (0, template_1.retrieve)();
};
exports.retrieveSample = retrieveSample;
