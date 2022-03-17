"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = "Auth";
const signJWT = (user, callback) => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config_1.default.server.token.expireTime) * 100000;
    const expirationTimeinSeconds = Math.floor(expirationTime / 1000);
    logging_1.default.info(NAMESPACE, `Attempting to sign token for ${user.username}`);
    const signJWT = (user, callback) => {
        var timeSinceEpoch = new Date().getTime();
        var expirationTime = timeSinceEpoch + Number(config_1.default.server.token.expireTime) * 100000;
        var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
        logging_1.default.info(NAMESPACE, `Attempting to sign token for ${user.username}`);
        try {
            jsonwebtoken_1.default.sign({
                username: user.username
            }, config_1.default.server.token.secret, {
                issuer: config_1.default.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            }, (error, token) => {
                if (error) {
                    callback(error, null);
                }
                else if (token) {
                    callback(null, token);
                }
            });
        }
        catch (error) {
            if (error instanceof Error) {
                logging_1.default.error(NAMESPACE, error.message, error);
                callback(error, null);
            }
            else
                logging_1.default.error(NAMESPACE, 'CONFUSION');
        }
    };
};
exports.default = signJWT;
