import mongoose from 'mongoose';

const specialitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    matchingName: {
        type: String,
        required: true,
        unique: true
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
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    imagePublicId: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true,
    }

}, { timestamps: true })

export const Speciality = mongoose.models.Speciality || mongoose.model('Speciality', specialitySchema);