import express from "express"
import { addDoctor, addSpeciality, allDoctors, allSpecialities, appointmentsAdmin, cancelAppointment, editSpeciality, loginAdmin } from "../controllers/admin.controller.js"
import { changeAvailability } from "../controllers/doctor.controller.js";

import upload from "../middlewares/multer.middleware.js"
import authAdmin from "../middlewares/authAdmin.middleware.js";

const adminRouter = express.Router();


adminRouter.post("/add-speciality", authAdmin, upload.single('image'), addSpeciality);
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.get("/all-specialities", authAdmin, allSpecialities);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, cancelAppointment)

// temporary route to edit speciality
adminRouter.post("/edit-speciality", authAdmin, upload.single('image'), editSpeciality)

export default adminRouter;