import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABASE = process.env.MYSQL_HOST || 'supercooldb';
const MYSQL_USER = process.env.MYSQL_HOST || 'superuser';
const MYSQL_PASSWORD = process.env.MYSQL_HOST || 'superpassword';

// Defining MYSQL Object
const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
};

// Defining SERVER Object
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

// Defining CONFIG Object
const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;
