import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    try {
        const { doctoken } = req.headers;
        
        
        if (!doctoken) {
            return res
            .status(401)
            .json({ message: "Access denied, login again", success: false })
        }

        const decoded = jwt.verify(doctoken, process.env.JWT_SECRET);

        if (!decoded) {
            return res
                .status(401)
                .json({ message: "Unauthorized Access - Invalid Token", success: false })
        }

        req.body.doctorId = decoded.doctorId;

        next();
    } catch (error) {
        console.log("error in auth doctor middleware: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export default authDoctor;