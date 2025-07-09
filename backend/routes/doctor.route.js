import express from 'express';
import { doctorDashboard, getAllDoctors, loginDoctor } from '../controllers/doctor.controller.js';
import authDoctor from '../middlewares/authDoctor.middleware.js';
import { deleteNotification, notifications } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/list', getAllDoctors);

router.get('/doctor-dashboard', authDoctor, doctorDashboard);
router.post('/login', loginDoctor);

router.get('/notifications', authDoctor, notifications);
router.post('/delete-notification', authDoctor, deleteNotification);

export default router;