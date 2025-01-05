import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error connection to mongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb