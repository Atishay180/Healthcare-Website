import express from "express"
import { addDoctor, addSpeciality, allDoctors, allSpecialities, appointmentsAdmin, cancelAppointment, dashboard, editSpeciality, loginAdmin } from "../controllers/admin.controller.js"
import { changeAvailability } from "../controllers/doctor.controller.js";

import upload from "../middlewares/multer.middleware.js"
import authAdmin from "../middlewares/authAdmin.middleware.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

adminRouter.get("/dashboard", authAdmin(["admin", "viewer"]), dashboard);
adminRouter.post("/all-doctors", authAdmin(["admin", "viewer"]), allDoctors);
adminRouter.get("/all-specialities", authAdmin(["admin", "viewer"]), allSpecialities);
adminRouter.get("/appointments", authAdmin(["admin", "viewer"]), appointmentsAdmin);

adminRouter.post("/add-speciality", authAdmin(["admin"]), upload.single('image'), addSpeciality);
adminRouter.post("/add-doctor", authAdmin(["admin"]), upload.single('image'), addDoctor);
adminRouter.post("/change-availability", authAdmin(["admin"]), changeAvailability);
adminRouter.post("/cancel-appointment", authAdmin(["admin"]), cancelAppointment);

// temporary route to edit speciality
adminRouter.post("/edit-speciality", authAdmin(["admin"]), upload.single('image'), editSpeciality)

export default adminRouter;