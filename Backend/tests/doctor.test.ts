import { fail } from 'assert';
import logging from '../source/config/logging';
import { doctorModel } from '../source/models/doctor';
import { patient } from '../source/models/patient';
import * as doctorService from '../source/services/doctor';

const NAMESPACE = 'account/test';

const patientTesterReal: patient = { patientID: 150, doctorID: 177, weight: 0, height: 0, dateOfBirth: 0, isQuarantined: true, isPrioritized: true, covidStatus: true, contactID: 3 };
const patientTesterFake: patient = { patientID: 151, doctorID: 175, weight: 0, height: 0, dateOfBirth: 0, isQuarantined: false, isPrioritized: true, covidStatus: false, contactID: 3 };
const doctorTesterReal: doctorModel = { doctorID: 176, phoneNumber: 'null', IsActive: false };
const doctorTesterFake: doctorModel = { doctorID: 175, phoneNumber: 'null', IsActive: false };

describe('doctor', () => {
    describe('getDoctorsNumberOfPatient route', () => {
        describe('given the doctor exists', () => {
            it('should return true', async () => {
                await expect(doctorService.getDoctorsNumberOfPatients(patientTesterReal)).resolves.toBeTruthy();
            });
        });
        describe('given the doctor does not exists', () => {
            it('should throw error', async () => {
                try {
                    await doctorService.getDoctorsNumberOfPatients(patientTesterFake);
                } catch (e) {
                    expect(e).toMatch('This doctor does not exist');
                }
            });
        });
    });

    describe('getDoctorsPatientsInfo route', () => {
        describe('given the patient exists', () => {
            it('should return true', async () => {
                await expect(doctorService.getDoctorsPatientsInfo(patientTesterReal)).resolves.toBeTruthy();
            });
        });
        describe('given the patient does not exists', () => {
            it('should throw error', async () => {
                try {
                    await doctorService.getDoctorsPatientsInfo(patientTesterFake);
                } catch (e) {
                    expect(e).toMatch('This doctor does not exist');
                }
            });
        });
    });

    describe('getDoctorsInfo route', () => {
        describe('given a wrong user', () => {
            it('should throw error', async () => {
                try {
                    await doctorService.getDoctorsInfo(doctorTesterFake);
                } catch (e) {
                    expect(e).toMatch('This doctor does not exist');
                }
            });
        });
    });
});

afterAll(() => {
    logging.info(NAMESPACE, 'ALL DOCTOR TESTS ARE FINISHED');
});
