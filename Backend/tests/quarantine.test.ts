import axios from 'axios';
import {quarantine} from '../source/models/quarantine'
import { patientDTO } from '../source/models/patientDTO';
import { calculateDaysLeft, getRemainingDays, inputStartTime } from '../source/services/quarantine'
import logging from '../source/config/logging';


const NAMESPACE = 'quarantine/test';


test('inputStartTime:success', async () => {
    const quarantine: quarantine = {patientID:145, inQuarantine: 1, startTime: "2021-02-24" , endDate: "2021-02-28", daysLeft: 0 };
    const patient: patientDTO = {patientID: 10 }
    var result = await inputStartTime(quarantine, patient);
    logging.debug(NAMESPACE,"the result",result);
    expect(result).toBe(true);
});

test('getRemainingDays:success', async () => {
    const quarantine: quarantine = {patientID:145, inQuarantine: 1, startTime: "2021-02-24" , endDate: "2021-02-28", daysLeft: 0 };
    const patient: patientDTO = {patientID: 10 }
    var result = await getRemainingDays(quarantine, patient);
    expect(result).toBe(true);
});

test('calculateDaysLeft: success', async () => {
    const quarantine: quarantine = {patientID:145, inQuarantine: 1, startTime: "2021-02-24" , endDate: "2021-02-28", daysLeft: 0 };
    const patient: patientDTO = {patientID: 10 }
    var result = await calculateDaysLeft(quarantine, patient);
    expect(result).toBe(true);
})

