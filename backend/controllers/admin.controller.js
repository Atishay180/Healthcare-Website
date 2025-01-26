import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { Doctor } from "../models/doctor.model.js";

//API for adding doctor
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
        if (password.length < 8) {
            return res
                .status(400)
                .json({ message: "Password must be atleast 8 characters long", success: false })
        }

        //hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        //create doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        }

        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

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

//api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required", success: false })
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({email}, process.env.JWT_SECRET, {"expiresIn": "10d"});
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

export { addDoctor, loginAdmin }