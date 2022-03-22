import express from 'express';

const router = express.Router();

router.get('/dashboard');
router.get('/profile');
router.get('/message');
router.get('/calendar');

export = router;
