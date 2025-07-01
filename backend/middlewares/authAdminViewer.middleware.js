import jwt from "jsonwebtoken";

const authAdminViewer = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res
                .status(400)
                .json({ message: "Access denied, login again", success: false })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'viewer') {
            return res
                .status(400)
                .json({ message: "Access denied", success: false })
        }

        next();

    } catch (error) {
        console.log("error in authAdminViewer middleware: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export default authAdminViewer;