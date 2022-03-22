import express from 'express';
import accountController from '../controllers/account';

const router = express.Router();

router.post('/account/login', accountController.login);
router.get('/account/getAccount', accountController.getAccount);
router.post('/account/createAccount', accountController.register);
router.post('/account/deleteAccount', accountController.deleteAccount);
router.get('/account/getAllDoctors', accountController.getAllDoctors);
router.get('/account/getAllPatients', accountController.getAllPatients);
router.get('/account/createAccount', accountController.register);
router.get('/account/login', accountController.login);

export = router;
