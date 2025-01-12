import jwt from "jsonwebtoken"
import Driver from "../models/driver.model.js"

export const driverProtectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt
        if(!token)
        {
            return res.status(401).json({ message: "Unauthorized access"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded)
        {
            return res.status(401).json({ message: "Invalid Token"})
        }

        const user = await Driver.findById(decoded.userId).select("-password")

        if(!user)
        {
            return res.status(404).json({ message: "No User found"})
        }

        req.user = user

        next()

    } catch (error) {
        console.log("Error in driverProtectRout middleware " , error.message)
        res.status(500).json({ message: "Internal Server Error"})
    }
}