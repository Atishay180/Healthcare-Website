import jwt from "jsonwebtoken";

//admin auth middleware
const authAdmin = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res
                .status(400)
                .json({ message: "Access denied, login again", success: false })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res
                .status(400)
                .json({ message: "Access denied, you are not a admin", success: false })
        }

        next();
    } catch (error) {
        console.log("error in auth admin middleware: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export default authAdmin;