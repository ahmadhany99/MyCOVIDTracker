/**
 * @fileoverview 
 * Routes for the quarantine feature
 * @package
 */


import express from 'express';
import quarantineController from '../controllers/quarantine';

const router = express.Router();

router.post('/quarantine/set/start', quarantineController.inputStartDate);
router.post('/quarantine/set/end', quarantineController.inputEndDate);
router.get('/quarantine/getRemainingDays', quarantineController.getRemainingDays);
// #TODO maybe put this route in patient?
router.get('/quarantine/setQuarantineTrue', quarantineController.setQuarantineTrue);

export = router;