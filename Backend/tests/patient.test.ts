import logging from '../source/config/logging';
import { patient } from '../source/models/patient';
import { countAllPatients } from '../source/repositories/patient';
import {setCovidStatus, getPatient, getCovidStatus} from '../source/services/patient';

const NAMESPACE = 'patient/test';

test('setCovidStatus:success', async () => {
    const patient: patient = {patientID:166, doctorID: 64,contactID: 1, weight: 12, height: 45, dateOfBirth: 2, isQuarantined: true,
    isPrioritized: false, covidStatus: false };
    var result = await setCovidStatus(patient);
    expect(result).toBe(true);
})

test('setCovidStatus:failed', async () => {
    const patient: patient = {patientID:200, doctorID: 64,contactID: 1, weight: 12, height: 45, dateOfBirth: 2, isQuarantined: true,
    isPrioritized: false, covidStatus: false };
    var result = await setCovidStatus(patient);
    expect(result).toBe(false);
})

test('getPatient:success', async () => {
    const patient: patient = {patientID:166, doctorID: 64,contactID: 1, weight: 12, height: 45, dateOfBirth: 2, isQuarantined: true,
    isPrioritized: false, covidStatus: false };
    var result = await getPatient(patient);
    expect(result).toBe(true);
})

test('getPatient:failed', async () => {
    const patient: patient = {patientID:200, doctorID: 64,contactID: 1, weight: 12, height: 45, dateOfBirth: 2, isQuarantined: true,
    isPrioritized: false, covidStatus: false };
    var result = await getPatient(patient);
    expect(result).toBe(false);
})



test('getCovidStatus:success', async () => {
    const patient: patient = {patientID:166, doctorID: 64,contactID: 1, weight: 12, height: 45, dateOfBirth: 2, isQuarantined: true,
    isPrioritized: false, covidStatus: false };
    var result = await getCovidStatus(patient);
    expect(result).toBe(false);
})







