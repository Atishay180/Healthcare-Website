import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import { Doctor } from "../models/doctor.model.js";
import { Speciality } from "../models/speciality.model.js";
import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js"


// api for adding speciality
const addSpeciality = async (req, res) => {
    try {
        const { name, status, description } = req.body;
        const imageFile = req.file;

        if (!name || !status || !description) {
            return res
                .status(400)
                .json({ message: "All fields are required", success: false })
        }

        //speciality name used to identify existance 
        const matchingName = name.replace(/\s+/g, '').toLowerCase();

        //check if speciality already exists
        const specialityExists = await Speciality.findOne({ matchingName });

        if (specialityExists) {
            return res
                .status(400)
                .json({ message: "Speciality already exists", success: false })
        }

        let image = "";
        let imagePublicId = "";

        if (imageFile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
                folder: "Health-Care/Specialities"
            });

            image = imageUpload.secure_url;
            imagePublicId = imageUpload.public_id;
        }


        //create speciality data
        const specialityData = {
            name,
            matchingName,
            status,
            description,
            image,
            imagePublicId
        }

        const newSpeciality = new Speciality(specialityData);
        await newSpeciality.save();

        await Notification.create({
            userId: newSpeciality._id,
            userType: 'Speciality',
            message: `A new speciality "${name}" has been added to the system`
        })

        return res
            .status(200)
            .json({ message: "Speciality added successfully", success: true });

    } catch (error) {
        console.log("error in add speciality: ", error.message);
        return res
            .status(500)
            .json({ message: "Internal server error", success: false });
    }
}

// temporary controller to edit speciality
const editSpeciality = async (req, res) => {
    try {

        const { specialityId } = req.body;
        const imageFile = req.file;

        const speciality = await Speciality.findById(specialityId)

        // Normalize name
        const matchingName = speciality.name.replace(/\s+/g, '').toLowerCase();

        // Upload new image if file is provided
        let image = speciality.image;
        let imagePublicId = speciality.imagePublicId;

        if (imageFile) {
            // Delete old image if exists
            if (imagePublicId) {
                await cloudinary.uploader.destroy(imagePublicId);
            }

            const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
                folder: "Health-Care/Specialities"
            });

            image = uploadResult.secure_url;
            imagePublicId = uploadResult.public_id;
        }

        // Update the speciality
        speciality.matchingName = matchingName;
        speciality.image = image;
        speciality.imagePublicId = imagePublicId;

        await speciality.save();

        return res
            .status(200)
            .json({ success: true, message: "Speciality updated successfully" });

    } catch (error) {
        console.error("Edit Speciality Error:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

// api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        //check if all fields are present
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res
                .status(400)
                .json({ message: "All fields are required", success: false })
        }

        //check if email is valid
        if (!validator.isEmail(email)) {
            return res
                .status(400)
                .json({ message: "Invalid email", success: false })
        }

        //check if password is atleast 8 characters long
        if (password.length < 8 || password.length > 20) {
            return res
                .status(400)
                .json({ message: "Password must be between 8 and 20 characters", success: false })
        }

        //hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        //create a unique doctorId
        const random = Math.floor(100 + Math.random() * 900); // 100–999 always 3 digits
        const doctorId = `DOC-PR${Date.now()}${random}`;

        //get speciality details
        const specialityDetails = await Speciality.findById(speciality);

        //create doctor data
        const doctorData = {
            doctorId,
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality: specialityDetails.name,
            specialityId: speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        }

        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        await Notification.create({
            userId: newDoctor._id,
            userType: 'Doctor',
            message: `${name} has been added to the system`
        })

        // add doctor to speciality
        await Speciality.findByIdAndUpdate(speciality,
            { $push: { doctors: newDoctor._id } },
            { new: true, }
        )

        return res
            .status(200)
            .json({ message: "Doctor added successfully", success: true })

    } catch (error) {
        console.log("error in add doctor controller: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

// api for admin & viewer login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required", success: false })
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { "expiresIn": "10d" });
            return res
                .status(200)
                .json({ message: "Admin logged in successfully", success: true, token })
        }

        if (email === process.env.VIEWER_EMAIL && password === process.env.VIEWER_PASSWORD) {
            const token = jwt.sign({ email, role: 'viewer' }, process.env.JWT_SECRET, { "expiresIn": "10d" });
            return res
                .status(200)
                .json({ message: "Admin logged in successfully", success: true, token })
        }

        return res
            .status(400)
            .json({ message: "Invalid credentials", success: false })

    } catch (error) {
        console.log("error in login admin controller: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal server error" })

    }
}

// api for getting all doctors in admin panel
const allDoctors = async (req, res) => {
    try {

        const token = req.headers.token;

        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized access", success: false })
        }

        const doctors = await Doctor.find({}).select("-password")

        if (doctors.length === 0) {
            return res
                .status(404)
                .json({ message: "No doctors found", success: false })
        }

        return res
            .status(200)
            .json({ message: "Doctors fetched successfully", success: true, doctors })

    } catch (error) {
        console.log("error in allDoctors controller: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal server error", sucess: false })
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

// api to get all appointments list 
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await Appointment.find({});

        if (!appointments || appointments.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "No appointments found" });
        }

        return res
            .status(200)
            .json({ success: true, appointments });
    } catch (error) {
        console.log("error in appointmentsAdmin controller: ", error.message);
        return res
            .status(500)
            .json({ message: "Internal server error", success: false });
    }
}

// api for appointment cancellation 
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res
                .status(400)
                .json({ success: false, message: "No Appointment Found" });
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

// api to get dashboard 
const dashboard = async (req, res) => {
    try {
        const [doctors, users, appointments] = await Promise.all([
            Doctor.find({}),
            User.find({}),
            Appointment.find({})
        ])
        // const doctors = await Doctor.find({});
        // const users = await User.find({});
        // const appointments = await Appointment.find({});

        const dashboardData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: [...appointments].reverse().slice(0, 5)
        }

        return res
            .status(200)
            .json({ success: true, message: "Dashboard fetched successfully", dashboardData })

    } catch (error) {
        console.error("Error in dashboard:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export { addSpeciality, addDoctor, loginAdmin, allDoctors, allSpecialities, editSpeciality, appointmentsAdmin, cancelAppointment, dashboard }