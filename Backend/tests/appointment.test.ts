import logging from '../source/config/logging';
import { appointmentModel } from '../source/models/appointment';
import { updateAppointment } from '../source/services/appointment';

const NAMESPACE = 'account/test';

test('updateAppointment:success', async () => {
    const appointment: appointmentModel = {appointmentID:1, patientID: 44, doctorID: 64,appointmentDate: "2018-03-29T13:34:00.000", description: 'test' };
    var result = await updateAppointment(appointment);
    expect(result).toBe(true);
})

test('updateAppointment:appointment does not exists', async () => {
    const appointment: appointmentModel = {appointmentID:101, patientID: 44, doctorID: 64,appointmentDate: "2018-03-29T13:34:00.000", description: 'test' };
    var result = await updateAppointment(appointment);
    expect(result).toBe(false);
})

