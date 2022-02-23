import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.post('/register', userController.createUser);
router.get('/users', userController.getAllUsers);

export = router;
