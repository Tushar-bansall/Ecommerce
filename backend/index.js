import express from 'express'
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import driverRoutes from "./routes/driver.auth.route.js"
import rideRoutes from "./routes/ride.route.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {app,server} from "./lib/socket.js"

import path from "path"


dotenv.config()
const __dirname = path.resolve()

const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend origin, make sure this is correct
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow credentials (cookies, headers)
};


app.use(express.json({ limit: '10mb' }))
app.use(cors(corsOptions));
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/driver",driverRoutes)
app.use("/api/ride",rideRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

server.listen(process.env.PORT,()=> 
    {
    console.log("Server is running on port "+ process.env.PORT)
    connectDB()
    }
)