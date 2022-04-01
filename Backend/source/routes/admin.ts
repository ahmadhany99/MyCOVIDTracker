import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();

router.get('/admin/assign', adminController.assignPatient);
router.get('/admin/createAdminAccount', adminController.createAdminAccount);

export = router;
