import express from 'express';
import doctorController from '../controllers/doctor';

const router = express.Router();

router.get('/doctor/getDoctor', doctorController.getDoctor);
router.get('/doctor/getAllDoctors', doctorController.getAllDoctors);
router.get('/doctor/countAllDoctors', doctorController.countAllDoctors);

export = router;
