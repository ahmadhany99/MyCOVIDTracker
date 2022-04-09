import express from 'express';
import patientController from '../controllers/patient';
import flaggingController from '../controllers/flagging';

const router = express.Router();

//get Patient info with patient ID
router.get('/patient/get', patientController.getPatient);
router.put('/patient/get', patientController.getPatient);
//Count the number of patients in the patient table
router.get('/patient/count', patientController.countAllPatients);
//Get doctor Id of patient with patient ID
router.get('/patient/get/doctor', patientController.getDoctor);
router.put('/patient/get/doctor', patientController.getDoctor);

//covidStatus routes
router.get('/patient/get/covid', patientController.getCovidStatus);
router.put('/patient/get/covid', patientController.getCovidStatus);
router.get('/patient/count/covid', patientController.getAllCovidPos);

router.put('/patient/update/covid', patientController.setCovidStatus);

//flagging routes
router.get('/patient/get/flag', flaggingController.getFlaggedPatients);
router.put('/patient/get/flag', flaggingController.getFlaggedPatients);

router.put('/patient/set/flag', flaggingController.flagPatient);
router.put('/patient/set/unflag', flaggingController.unflagPatient);

//#TODO quarantine routes

export = router;