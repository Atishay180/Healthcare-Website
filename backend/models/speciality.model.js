import mongoose from 'mongoose';

const specialitySchema = new mongoose.Schema({
    Speciality: {
        type: String,
        required: true,
        unique: true,
    },
    doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
        }
    ],
    status: {
        type: String,
        enum: ['Available', 'Unavailable', 'Coming Soon'],
        default: 'Available',
        required: true
    },
    description: {
        type: String,
        required: true,
    }

}, { timestamps: true })

export const Speciality = mongoose.models.Speciality || mongoose.model('Speciality', specialitySchema);