import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

dotenv.config()

//app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.get("/", (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDb()
})