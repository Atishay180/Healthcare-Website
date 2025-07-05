import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "userType",
        required: true
    },
    userType: {
        type: String,
        enum: ['Appointment', 'Doctor', 'Speciality', 'User'],
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);