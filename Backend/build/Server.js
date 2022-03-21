"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const template_1 = __importDefault(require("./routes/template"));
const account_1 = __importDefault(require("./routes/account"));
const quarantine_1 = __importDefault(require("./routes/quarantine"));
const status_1 = __importDefault(require("./routes/status"));
const appointment_1 = __importDefault(require("./routes/appointment"));
const flagging_1 = __importDefault(require("./routes/flagging"));
const NAMESPACE = 'Server';
const router = (0, express_1.default)();
/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        /** Log the res */
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
/** Parse the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
/** Routes go here */
router.use('/api', template_1.default);
router.use('/api', account_1.default);
router.use('/api', quarantine_1.default);
router.use('/api', status_1.default);
router.use('/api', appointment_1.default);
router.use('/api', flagging_1.default);
/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found2');
    res.status(404).json({
        message: error.message
    });
});
const httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));
