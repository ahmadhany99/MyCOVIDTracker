import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.post('/register', controller.register);
router.get('/users', controller.getAllUsers);

export = router;
