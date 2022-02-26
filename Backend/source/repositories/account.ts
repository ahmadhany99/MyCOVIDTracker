import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'account/repository';

const create = (user: accountModel, hash: string) => {
    const query = `INSERT INTO test VALUES ("${user.username}", "${hash}")`;
    logging.info(NAMESPACE, 'WE OUT HERE');
    return queryDatabase(query);
}
const retrieve = () => {
    const query = 'SELECT * FROM test';

    return queryDatabase(query);
}

const getAccountByUsername = () => {
    const query = 'SELECT * FROM account ';
    return queryDatabase(query);
}

export {getAccountByUsername, create, retrieve};


