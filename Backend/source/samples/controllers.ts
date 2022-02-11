import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = "samples/controllers.ts";

//  createSample (POST)
const createSample = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Creating sample.');

    let { LastName, FirstName } = req.body;
    let query = `INSERT INTO samples VALUES ("${LastName}", "${FirstName}")`;

    queryDatabase(req, res, next, query); 
};

//  getAllSamples (GET)
const getAllSamples = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all samples.');

    let query = 'SELECT * FROM samples';

    queryDatabase (req, res, next, query);
};









function queryDatabase (req: Request, res: Response, next: NextFunction, query: string ){
    logging.info(NAMESPACE, 'Connecting to SQL Server.');

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
}
export default { getAllSamples, createSample };
