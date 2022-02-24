import { userModel } from '../models/user';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'user/repository';

const create = (user: userModel, hash: string) => {
    const query = `INSERT INTO users VALUES ("${user.username}", "${hash}")`;
    logging.info(NAMESPACE, 'WE OUT HERE');
    return queryDatabase(query);
}
const retrieve = () => {
    const query = 'SELECT * FROM users';

    return queryDatabase(query);
}

export {create, retrieve};

