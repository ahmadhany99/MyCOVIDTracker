import express from 'express';
import accountController from '../controllers/account';

const router = express.Router();

router.put('/account/login', accountController.loginClient);
router.put('/admin/login', accountController.loginAdmin);

router.post('/account/register', accountController.registerClient);
router.post('/admin/register', accountController.registerAdmin);

router.get('/account/get', accountController.getAccount);

router.delete('/account/delete', accountController.deleteAccount);

export = router;
