import express from 'express';
import controller from './controllers';

const router = express.Router();

router.post('/create/sample', controller.createSample);
router.get('/get/samples', controller.getAllSamples);

export = router;
