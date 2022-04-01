import { doctorModel } from '../models/doctor';
import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'doctor/repository';

const getDoctor = (account: accountModel) => {
    const query = `SELECT doctor.* FROM doctor, account WHERE doctor.accountID = account.accountID`;
    return queryDatabase(query);
};

const countAllDoctors = (doctor: doctorModel) => {
    const query = `SELECT COUNT(*) as countAllDoctors FROM doctor`;
    return queryDatabase(query);
};

// Get all doctors from db. A doctor is an account with 2 as a typeId
const getAllDoctors = () => {
    const query = `SELECT * FROM doctor`;
    return queryDatabase(query) as unknown as accountModel[];
};

const checkIfDoctorExistsInDoctor = (account: accountModel) => {
    const query = `SELECT * FROM account WHERE account.firstName = "${account.firstname}" AND account.lastName = "${account.lastname}" `;
    logging.debug(NAMESPACE, 'query:', query);
    return queryDatabase(query) as unknown as doctorModel[];
};

export { getDoctor, countAllDoctors, checkIfDoctorExistsInDoctor, getAllDoctors };
