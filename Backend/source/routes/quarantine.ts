/**
 * @fileoverview 
 * Routes for the quarantine feature
 * @package
 */


import express from 'express';
import quarantineController from '../controllers/quarantine';

const router = express.Router();

router.post('/quarantine/inputStartDate', quarantineController.inputStartDate);
router.post('/quarantine/inputEndDate', quarantineController.inputEndDate);
router.get('/quarantine/getRemainingDays', quarantineController.getRemainingDays);
router.get('/quarantine/setQuarantineTrue', quarantineController.setQuarantineTrue);

export = router;