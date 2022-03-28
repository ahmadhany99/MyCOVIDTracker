import express from 'express';
import patientController from '../controllers/patient';

const router = express.Router();

router.get('/patient/getPatient', patientController.getPatient);
router.get('/patient/countAllPatients', patientController.countAllPatients);

export = router;