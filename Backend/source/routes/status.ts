import express from 'express';
import statusController from '../controllers/status';

const router = express.Router();

router.post('/status/update', statusController.updateStatus);

router.get('/status/get', statusController.getStatus);
router.put('/status/get', statusController.getStatus);
router.get('/status/get/all', statusController.getAllStatus);
router.get('/status/get/all/user', statusController.getStatusByPatient);
router.put('/status/get/all/user', statusController.getStatusByPatient);
router.get('/status/get/all/date', statusController.getStatusByDate);
router.put('/status/get/all/date', statusController.getStatusByDate);

router.delete('/status/delete', statusController.deleteStatus);


export = router;
