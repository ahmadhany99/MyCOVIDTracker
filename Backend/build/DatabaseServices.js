"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryDatabase = void 0;
const logging_1 = __importDefault(require("./config/logging"));
const mysql_1 = require("./config/mysql");
const NAMESPACE = 'DatabaseServices';
function queryDatabase(query) {
    logging_1.default.info(NAMESPACE, 'Connecting to SQL Server.');
    return (0, mysql_1.Connect)()
        .then((connection) => {
        return (0, mysql_1.Query)(connection, query)
            .then((result) => {
            return result;
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            throw error;
        })
            .finally(() => {
            logging_1.default.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        throw error;
    });
}
exports.queryDatabase = queryDatabase;
