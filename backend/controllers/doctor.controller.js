import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

import { Doctor } from "../models/doctor.model.js";
import { Notification } from "../models/notification.model.js";
import { Appointment } from "../models/appointment.model.js";


const changeAvailability = async (req, res) => {
    try {

        const { doctorId } = req.body;

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res
                .status(404)
                .json({ success: false, message: "Doctor not found" });
        }

        await Doctor.findByIdAndUpdate(doctorId, { available: !doctor.available });

        await Notification.create({
            userId: doctorId,
            userType: 'Doctor',
            message: `${doctor.name} updated his availability`
        })

        return res
            .status(200)
            .json({ success: true, message: "Availability Changed" })


    } catch (error) {
        console.error("Error in changeAvailability controller", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select(['-password', '-email']);

        if (!doctors || doctors.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No doctors found" });
        }

        return res
            .status(200)
            .json({ success: true, message: "Doctors fetched successfully", doctors });
    } catch (error) {
        console.error("Error in getAllDoctors controller", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

const doctorDashboard = async (req, res) => {
    try {
        const { doctorId } = req.body;

        if (!doctorId) {
            return res
                .status(401)
                .json({ success: false, message: "doctorId is required field" });
        }

        const doctor = await Doctor.findById(doctorId).select("-password");

        if (!doctor) {
            return res
                .status(401)
                .json({ success: false, message: "No doctor found" });
        }

        //fetch appointment 
        const appointments = await Appointment.find({ docId: doctorId });

        return res
            .status(200)
            .json({ success: true, message: "Dashboard fetch succesfully", doctor, appointments });

    } catch (error) {
        console.error("Error in doctor dashboard controller", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const existingDoctor = await Doctor.findOne({ email });

        if (!existingDoctor) {
            return res
                .status(400)
                .json({ success: false, message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingDoctor.password);

        if (!isPasswordCorrect) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid password" });
        }

        const doctoken = jwt.sign({ doctorId: existingDoctor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res
            .status(200)
            .json({ success: true, message: `Welcome back ${existingDoctor.name}`, doctoken });

    } catch (error) {
        console.error("Error in login doctor controller", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

export { changeAvailability, getAllDoctors, loginDoctor, doctorDashboard };