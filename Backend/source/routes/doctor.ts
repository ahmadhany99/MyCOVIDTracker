import express from 'express';
import doctorController from '../controllers/doctor';

const router = express.Router();

router.get('/doctor/getAllDoctors', doctorController.getDoctors);
router.get('/doctor/getDoctorsCount', doctorController.getDoctorsCount);
router.post('/doctor/getDoctorsNumberOfPatients', doctorController.getDoctorsNumberOfPatients);
router.post('/doctor/getDoctorsPatientsInfo', doctorController.getDoctorsPatientsInfo);
router.post('/doctor/getDoctorsInfo', doctorController.getDoctorsInfo);


export = router;
