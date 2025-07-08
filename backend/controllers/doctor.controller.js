import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

import { Doctor } from "../models/doctor.model.js";
import { Notification } from "../models/Notification.model.js";


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

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email);
        

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

        const doctorToken = jwt.sign({ id: existingDoctor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res
            .status(200)
            .json({ success: true, message: `Welcome back ${existingDoctor.name}`, doctorToken });

    } catch (error) {
        console.error("Error in login doctor controller", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

export { changeAvailability, getAllDoctors, loginDoctor };