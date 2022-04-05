import { patient } from '../models/patient';
import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'patient/repository';

const getPatient = (account: accountModel) => {
    const query = `SELECT patient.* FROM patient, account WHERE patient.patientID = account.accountID AND
    account.firstName = '${account.firstname}' AND account.lastName = '${account.lastname}'`;
    return queryDatabase(query);
}

const countAllPatients = (patient: patient) => {
    const query = `SELECT COUNT(*) as countAllPatients FROM patient`;
    return queryDatabase(query);
}

const checkIfPatientExistsInPatient = (account : accountModel) =>{
    const query = `SELECT * FROM account WHERE account.firstName = "${account.firstname}" AND account.lastName = "${account.lastname}" `;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as patient[];
}





export{
    getPatient,
    countAllPatients,
    checkIfPatientExistsInPatient
};