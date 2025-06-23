import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

import adminRouter from "./routes/admin.route.js"
import doctorRouter from "./routes/doctor.route.js"
import userRouter from "./routes/user.route.js"
import Razorpay from "razorpay"

dotenv.config()

//app config
const app = express()
const port = process.env.PORT || 5000
connectCloudinary()

//middleware
app.use(express.json());
app.use(cookieParser());

// const allowedOrigins = [
//     process.env.FRONTEND_USER_URL,
//     process.env.FRONTEND_ADMIN_URL
// ];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));
app.use(cors());

//razorpay instance 
export const razorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

//api endpoints
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/user", userRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDb()
})