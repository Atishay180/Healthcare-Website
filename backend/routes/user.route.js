import express from "express";
import { getUserProfile, loginUser, registerUser, updateUserProfile, bookAppointment, allSpecialities, listAppointment } from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-profile", authUser, getUserProfile)
router.get("/all-specialities", allSpecialities)
router.post("/update-profile", upload.single('image'), authUser, updateUserProfile)
router.post("/book-appointment", authUser, bookAppointment)
router.get("/appointments", authUser, listAppointment)

export default router;