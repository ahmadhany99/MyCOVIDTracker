/**
 * @fileoverview 
 * Routes for the quarantine feature
 * @package
 */


import express from 'express';
import quarantineController from '../controllers/quarantine';

const router = express.Router();

router.post('/quarantine/inputStartTime', quarantineController.inputStartTime);
router.post('/quarantine/daysLeft', quarantineController.calculateDaysLeft);
router.get('/quarantine/getRemainingDays', quarantineController.getRemainingDays);

export = router;