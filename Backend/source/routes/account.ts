import express from 'express';
import accountController from '../controllers/account';

const router = express.Router();

router.put('/account/login', accountController.loginClient);
router.put('/admin/login', accountController.loginAdmin);

router.post('/account/register', accountController.registerClient);
router.post('/admin/register', accountController.registerAdmin);

//plz test and choose only one to use between get/put
router.get('/account/get', accountController.getAccount);
router.put('/account/get', accountController.getAccount);
router.get('/account/get/patient', accountController.getPatients);

router.delete('/account/delete', accountController.deleteAccount);

export = router;
