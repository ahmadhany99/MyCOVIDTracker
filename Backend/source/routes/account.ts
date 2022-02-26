import express from 'express';
import accountController from '../controllers/account';

const router = express.Router();


router.get('/account/login', accountController.login);

export = router;
