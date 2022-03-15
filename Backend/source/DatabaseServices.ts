import { json } from 'body-parser';
import logging from './config/logging';
import { Connect, Query } from './config/mysql';

const NAMESPACE = 'DatabaseServices';

function queryDatabase(query: string) {
    logging.info(NAMESPACE, 'Connecting to SQL Server.');

    return Connect()
        .then((connection) => {
            return Query(connection, query)
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    throw error;
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);
            throw error;
    });
}

export {queryDatabase};