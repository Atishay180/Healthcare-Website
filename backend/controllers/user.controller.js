import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";


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
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

            const imageURL = imageUpload.secure_url;

            await User.findByIdAndUpdate(userId, { image: imageURL })
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

export { registerUser, loginUser, getUserProfile, updateUserProfile };