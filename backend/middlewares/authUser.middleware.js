import jwt from "jsonwebtoken";

//user auth middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res
                .status(400)
                .json({ message: "Access denied, login again", success: false })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = decoded.id;

        next();
    } catch (error) {
        console.log("error in auth user middleware: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export default authUser;