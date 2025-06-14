import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import { Doctor } from "../models/doctor.model.js";
import { Speciality } from "../models/speciality.model.js";


// api for adding speciality
const addSpeciality = async (req, res) => {
    try {
        const { name, status, description } = req.body;

        if (!name || !status || !description) {
            return res
                .status(400)
                .json({ message: "All fields are required", success: false })
        }

        //check if speciality already exists
        const specialityExists = await Speciality.findOne({ name });

        if (specialityExists) {
            return res
                .status(400)
                .json({ message: "Speciality already exists", success: false })
        }

        //create speciality data
        const specialityData = {
            name,
            status,
            description,
        }

        const newSpeciality = new Speciality(specialityData);
        await newSpeciality.save();

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

// api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required", success: false })
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { "expiresIn": "10d" });
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

export { addSpeciality, addDoctor, loginAdmin, allDoctors, allSpecialities }