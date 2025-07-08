import express from 'express';
import { getAllDoctors, loginDoctor } from '../controllers/doctor.controller.js';

const router = express.Router();

router.get('/list', getAllDoctors);
router.post('/login', loginDoctor);

export default router;