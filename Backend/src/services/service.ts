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
import { create, retrieve } from "../repositories/user";

const NAMESPACE = 'user/service';

const Signup = async (user: userModel) => {
    // Business Logic

    // Call to user repository
    const userRecord = await create(user);
    return userRecord;
}

const retrieveSample = () => {
    // Business Logic
    // Call Repo
    return retrieve();
}

export {Signup, retrieveSample};
