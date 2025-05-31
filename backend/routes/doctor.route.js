import express from 'express';
import { getAllDoctors } from '../controllers/doctor.controller.js';

const router = express.Router();

router.get('/list', getAllDoctors);

export default router;