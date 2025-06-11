import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dg8lfsyon/image/upload/v1749643374/upload_area_rfgbkr.png"
    },
    imagePublicId: {
        type: String,
        default: "",
    },
    address: {
        type: Object,
        default: {
            line1: '',
            line2: '',
        }
    },
    gender: {
        type: String,
        default: "Not Selected"
    },
    dob: {
        type: String,
        default: "Not Selected"
    },
    phone: {
        type: String,
        default: "0000000000"
    }
}, { timestamps: true, minimize: false })

export const User = mongoose.models.User || mongoose.model("User", userSchema)