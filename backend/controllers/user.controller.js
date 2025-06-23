import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Appointment } from "../models/appointment.model.js";
import { Speciality } from "../models/speciality.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";

import { razorPayInstance } from "../server.js";


// api to register new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res
                .status(400)
                .json({ message: "Invalid email", success: false })
        }

        //check password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
        if (!passwordRegex.test(password)) {
            return res
                .status(400)
                .json({ success: false, message: "Password must contain at least one uppercase and one lowercase letter" });
        }

        //check password length
        if (password.length < 8 || password.length > 20) {
            return res
                .status(400)
                .json({ success: false, message: "Password must be between 8 and 20 characters" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new User(userData);
        const user = await newUser.save();

        // send email to user for successful registration

        // token generation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: false, // true in production with HTTPS
        //     sameSite: 'Strict', // or 'None' if cross-site and using secure
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // });

        return res
            .status(201)
            .json({ success: true, message: `Registered Successfully`, token });
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

// api to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "User does not exist" });
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }

        // token generation
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: false, // true in production with HTTPS
        //     sameSite: 'Strict', // or 'None' if cross-site and using secure
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // });

        return res
            .status(200)
            .json({ success: true, message: `Welcome back ${existingUser.name}`, token });
    } catch (error) {
        console.error("Error in loginUser:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

// api to get user profile
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await User.findById(userId).select("-password");

        if (!userData) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        return res
            .status(200)
            .json({ success: true, message: "User profile fetched successfully", userData });

    } catch (error) {
        console.error("Error in getUserProfile:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

// api for getting all specialities
const allSpecialities = async (req, res) => {
    try {
        const specialities = await Speciality.find({});

        if (specialities.length === 0) {
            return res
                .status(404)
                .json({ message: "No specialities found", success: false });
        }

        return res
            .status(200)
            .json({ message: "Specialities fetched successfully", success: true, specialities });

    } catch (error) {
        console.log("error in allSpecialities controller: ", error.message);
        return res
            .status(500)
            .json({ message: "Internal server error", success: false });
    }
}

// api to update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const imageFile = req.file;

        if (!userId) {
            return res
                .status(400)
                .json({ success: false, message: "User ID is required" });
        }

        const updateFields = {};

        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.phone) updateFields.phone = req.body.phone;
        if (req.body.address) updateFields.address = JSON.parse(req.body.address);
        if (req.body.dob) updateFields.dob = req.body.dob;
        if (req.body.gender) updateFields.gender = req.body.gender;

        if (Object.keys(updateFields).length > 0) {
            await User.findByIdAndUpdate(userId, updateFields);
        }

        if (imageFile) {

            const getUser = await User.findById(userId);

            // If user already has a profile image, delete it from Cloudinary
            if (getUser.imagePublicId) {
                await cloudinary.uploader.destroy(getUser.imagePublicId, { resource_type: "image" });
            }

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

            await User.findByIdAndUpdate(userId, {
                image: imageUpload.secure_url,
                imagePublicId: imageUpload.public_id
            })
        }

        return res
            .status(200)
            .json({ success: true, message: "User profile updated successfully" });

    } catch (error) {
        console.error("Error in updateUserProfile:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

// api to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        const doctor = await Doctor.findById(docId).select("-password");
        if (!doctor) {
            return res
                .status(404)
                .json({ success: false, message: "Doctor not found" });
        }

        if (!doctor.available) {
            return res
                .status(400)
                .json({ success: false, message: "Doctor is not available for booking" });
        }

        let slots_booked = doctor.slots_booked

        // check for slot availability

        // If slots_booked is an object and has the slotDate key, check if the slotTime is already booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res
                    .status(400)
                    .json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        }

        // If slots_booked is an object but does not have the slotDate key, create it
        else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const user = await User.findById(userId).select("-password");

        // deleting slots_booked from doctor data before saving to appointment but keeping it in the database of doctor
        // to avoid sending unnecessary data to the client
        delete doctor.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData: user,
            docData: doctor,
            amount: doctor.fees,
            slotTime,
            slotDate,
        }

        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save();

        // Update doctor's slots_booked in the database
        await Doctor.findByIdAndUpdate(docId, { slots_booked })

        return res
            .status(201)
            .json({ success: true, message: "Appointment booked successfully", appointment: newAppointment });

    } catch (error) {
        console.error("Error in bookAppointment:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });

    }
}

// api to fetch user appointment
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body

        const appointments = await Appointment.find({ userId })

        if (appointments.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "No appointments found" })
        }

        return res
            .status(200)
            .json({ success: true, appointments })
    } catch (error) {
        console.error("Error in bookAppointment:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

// api to cancel the appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        if (!userId) {
            return res
                .status(400)
                .json({ success: false, message: "No User Found" });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res
                .status(400)
                .json({ success: false, message: "No Appointment Found" });
        }

        if (appointment.userId.toString() !== userId.toString()) {
            return res
                .status(403)
                .json({ success: false, message: "Unauthorized Action" });
        }

        // Mark appointment as cancelled
        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Free doctors slot
        const { docId, slotDate, slotTime } = appointment;

        const doctor = await Doctor.findById(docId);
        if (!doctor) {
            return res
                .status(404)
                .json({ success: false, message: "Doctor not found" });
        }

        const slots_booked = doctor.slots_booked;
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(
                (time) => time !== slotTime
            );
        }

        await Doctor.findByIdAndUpdate(docId, { slots_booked });

        return res.status(200).json({
            success: true,
            message: "Appointment Cancelled",
        });

    } catch (error) {
        console.error("Error in cancelAppointment:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// api to make payment using razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res
                .status(400)
                .json({ success: false, message: "AppointmentId is required" })
        }

        const appointment = await Appointment.findById(appointmentId)

        if (!appointment || appointment.cancelled) {
            return res
                .status(400)
                .json({ success: false, message: "Appointment Cancelled or not exists" })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointment.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creating order
        const order = await razorPayInstance.orders.create(options);

        return res
            .status(200)
            .json({ success: true, order, message: "Payment Verifying" });

    } catch (error) {
        console.error("Error in paymentRazorpay:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

// api to verify the payment 
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            await Appointment.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            return res
                .status(200)
                .json({ success: true, message: "Payment Successful" })
        } else {
            return res
                .status(200)
                .json({ success: false, message: "Payment Failed" })
        }

    } catch (error) {
        console.error("Error in verifyPayment:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

export { registerUser, loginUser, getUserProfile, allSpecialities, updateUserProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyPayment };