import express from 'express';
import userController from '../controllers/user';


const router = express.Router();

router.get('/validate', userController.validateToken);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getAllusers', userController.getAllUsers);


export = router;
