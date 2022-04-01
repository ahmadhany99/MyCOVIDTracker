import { doctorModel } from '../models/doctor';
import { accountModel } from '../models/account';
import * as doctorRep from '../repositories/doctor';
import logging from '../config/logging';

const NAMESPACE = 'doctor/service';

const countAllDoctors = (doctor: doctorModel) => {
    return doctorRep.countAllDoctors(doctor);
};

const getDoctor = async (account: accountModel) => {
    var patientID = await doctorRep.checkIfDoctorExistsInDoctor(account);
    if (patientID[0] != undefined) {
        return doctorRep.getDoctor(account);
    } else {
        logging.error(NAMESPACE, 'This doctor is not in doctor table');
        throw 'This doctor does not exist';
    }
};

const getAllDoctors = () => {
    return doctorRep.getAllDoctors();
};

export { getDoctor, countAllDoctors, getAllDoctors };
