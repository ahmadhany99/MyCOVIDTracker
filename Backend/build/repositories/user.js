"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieve = exports.create = void 0;
const DatabaseServices_1 = require("../DatabaseServices");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'user/repository';
const create = (user, hash) => {
    const query = `INSERT INTO test VALUES ("${user.firstName}", "${hash}")`;
    logging_1.default.info(NAMESPACE, 'WE OUT HERE');
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.create = create;
const retrieve = () => {
    const query = 'SELECT * FROM test';
    return (0, DatabaseServices_1.queryDatabase)(query);
};
exports.retrieve = retrieve;
