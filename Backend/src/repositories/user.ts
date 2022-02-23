import { userModel } from '../models/user';
import { queryDatabase } from '../DatabaseServices';

const NAMESPACE = 'user/repository';

const create = (user: userModel) => {
    const query = `INSERT INTO samples VALUES ("${user.firstName}", "${user.lastName}")`;
    
    return queryDatabase(query);
}
const retrieve = () => {
    const query = 'SELECT * FROM samples';

    return queryDatabase(query);
}

export {create, retrieve};

