import express from 'express';
import { doctorDashboard, getAllDoctors, loginDoctor } from '../controllers/doctor.controller.js';
import authDoctor from '../middlewares/authDoctor.middleware.js';

const router = express.Router();

router.get('/list', getAllDoctors);

router.get('/doctor-dashboard', authDoctor, doctorDashboard);
router.post('/login', loginDoctor);

export default router;