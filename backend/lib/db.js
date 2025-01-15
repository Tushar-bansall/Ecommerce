import mongoose from 'mongoose'
import {config} from "dotenv"

config()

export const connectDB =async() =>{
    try {
       const conn= await mongoose.connect(process.env.MONGO_URI)
       console.log(`Connection to MongoDB : ${conn.connection.host}`)
    } catch (error) {
        console.log("Connection to MongoDB :",error)
    }
}