import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

import adminRouter from "./routes/admin.route.js"

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDb()
})