import express from 'express';
import patientController from '../controllers/patient';
import flaggingController from '../controllers/flagging';

const router = express.Router();

//get Patient info with patient ID
router.get('/patient/getPatient', patientController.getPatient);
//Count the number of patients in the patient table
router.get('/patient/countAllPatients', patientController.countAllPatients);
//Get doctor Id of patient with patient ID
router.get('/patient/getDoctor', patientController.getDoctor);

//for frontend use
router.post('/patient/getPatient', patientController.getPatient);
router.post('/patient/getDoctor', patientController.getDoctor);

//flagging routes
router.post('/patient/flagPatient', flaggingController.flagPatient);
router.post('/patient/getFlaggedPatients', flaggingController.getFlaggedPatients);

export = router;
