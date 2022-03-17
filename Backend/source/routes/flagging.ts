import express from 'express';
import flaggingController from '../controllers/flagging';

const router = express.Router();

router.post('/flag/flagPatient', flaggingController.flagPatient);
router.post('/flag/getFlaggedPatients', flaggingController.getFlaggedPatients);

export = router;