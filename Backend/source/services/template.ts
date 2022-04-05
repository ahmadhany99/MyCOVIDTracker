/* Should: 
        - Contain business logic
        - Leverage data access layer to interact with database
        - Be framework agnostic
    Should not:
        - Be provided req or req objects
        - Handle responding to clients
        - Provide anything related to HTTP transport layer: status codes, headers...
        - Directly interact with database
*/

import { userModel } from "../models/user";
import { create, retrieve } from "../repositories/template";
import bcryptjs, { hash } from 'bcryptjs';

const NAMESPACE = 'user/service';

const register = async (user: userModel) => {
    // Business Logic
    bcryptjs.hash(user.firstName, 10, (hashError, hash) => {
        if (hashError){
            return ({
                message: hashError.message,
                error: hashError
            })
        }
        const userRecord = create(user, hash);
        return userRecord;
    });
    // Call to user repository
}

const retrieveSample = () => {
    // Business Logic
    // Call Repo
    return retrieve();
}

export {register, retrieveSample};
