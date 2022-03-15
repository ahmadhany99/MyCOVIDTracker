import express from 'express';
import statusController from '../controllers/status';

const router = express.Router();

router.post('/status/updateStatus', statusController.updateStatus);
router.post('/status/deleteStatus', statusController.deleteStatus);
router.get('/status/getStatus', statusController.getStatus);
router.get('/status/getAllStatus', statusController.getAllStatus);

export = router;
