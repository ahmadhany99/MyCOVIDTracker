import express from 'express';
import statusController from '../controllers/status';

const router = express.Router();

// update patient's status args: uid, date, report
router.post('/status/updateStatus', statusController.updateStatus);
// delete status args: uid, date
router.post('/status/deleteStatus', statusController.deleteStatus);
// get unique status args: uid, date
router.get('/status/getStatus', statusController.getStatus);
// gets all status for user args: uid
router.get('/status/getAllStatus', statusController.getAllStatus);

export = router;
