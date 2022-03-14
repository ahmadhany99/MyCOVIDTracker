import express from 'express';
import appointmentController from '../controllers/appointment';

const router = express.Router();


router.post('/appointment/createAppointment', appointmentController.createAppointment);
router.post('/appointment/updateAppointment', appointmentController.updateAppointment);
router.get('/appointment/getAppointments', appointmentController.getAppointments);

export = router;
