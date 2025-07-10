import express from 'express';

import authDoctor from '../middlewares/authDoctor.middleware.js';

import { changeAvailability, doctorDashboard, getAllDoctors, loginDoctor } from '../controllers/doctor.controller.js';
import { deleteNotification, notifications } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/list', getAllDoctors);

router.get('/doctor-dashboard', authDoctor, doctorDashboard);
router.post('/change-availability', authDoctor, changeAvailability)
router.post('/login', loginDoctor);

router.get('/notifications', authDoctor, notifications);
router.post('/delete-notification', authDoctor, deleteNotification);

export default router;