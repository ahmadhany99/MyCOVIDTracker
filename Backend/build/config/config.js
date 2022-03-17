"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MYSQL_USER = process.env.MYSQL_HOST || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_HOST || 'soen390';
const MYSQL_HOST = process.env.MYSQL_HOST || '35.223.223.15';
const MYSQL_DATABASE = process.env.MYSQL_HOST || 'soen390';
// Defining MYSQL Object
const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
};
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600; // expire time in seconds
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIsuer'; //  organization name
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret'; //  encrypting jwt
// Defining SERVER Object
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};
// Defining CONFIG Object
const config = {
    mysql: MYSQL,
    server: SERVER
};
exports.default = config;
