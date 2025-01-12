import express from "express"
import { config } from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"

config()

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',  // Frontend origin, make sure this is correct
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allow credentials (cookies, headers)
  }))
app.use("/api/auth",authRoutes)

app.listen(process.env.PORT,()=> 
    {
    console.log("Server is running on port "+ process.env.PORT)
    connectDB()
    }
)