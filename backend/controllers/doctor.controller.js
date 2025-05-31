import { Doctor } from "../models/doctor.model.js";


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

        return res
            .status(200)
            .json({ success: true, message: "Availability Changed" })


    } catch (error) {
        console.error("Error changeAvailability controller", error.message);
        res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

export { changeAvailability };