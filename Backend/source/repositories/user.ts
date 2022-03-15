import { userModel } from '../models/user';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'user/repository';

const create = (user: userModel, hash: string) => {
    const query = `INSERT INTO test VALUES ("${user.firstName}", "${hash}")`;
    logging.info(NAMESPACE, 'WE OUT HERE');
    return queryDatabase(query);
}
const retrieve = () => {
    const query = 'SELECT * FROM test';

    return queryDatabase(query);
}

export {create, retrieve};

