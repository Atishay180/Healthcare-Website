import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

import adminRouter from "./routes/admin.route.js"
import doctorRouter from "./routes/doctor.route.js"
import userRouter from "./routes/user.route.js"

dotenv.config()

//app config
const app = express()
const port = process.env.PORT || 5000
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/user", userRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDb()
})