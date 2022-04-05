import express from 'express';
import appointmentController from '../controllers/appointment';

const router = express.Router();


router.post('/appointment/create', appointmentController.createAppointment);
router.post('/appointment/update', appointmentController.updateAppointment);
router.put('/appointment/get', appointmentController.getAppointments);

export = router;
