import dotenv from 'dotenv';

dotenv.config();

const MYSQL_USER = process.env.MYSQL_HOST || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_HOST || 'Jonamike8895';
const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABASE = process.env.MYSQL_HOST || 'supercooldb';

// Defining MYSQL Object
const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

// Defining SERVER Object
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
;
// Defining CONFIG Object
const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;
