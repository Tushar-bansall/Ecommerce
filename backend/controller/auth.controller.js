import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/token.js"

export const signup= async (req,res)=>{
    const {fullName,email,password} = req.body
    try {
        if(!fullName || !email || !password)
          {  return res.status(400).json({ message : "All fields are required"})}

        if(password.length < 6) {
            return res.status(400).json({ message : "Password must be at least 6 characters"})
        }

        const user = await User.findOne({email});

        if(user)
        {
            return res.status(400).json({ message: "User already exist with this email "})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password: hashPass
        })

        if(newUser)
        {
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email
            })
        }
        else{
            res.status(400).send({ message : "Invalid User Data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ messaage: "Internal Server Error"})
    }
}

export const login= async (req,res)=>{
    const {email,password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user)
        {
            return res.status(400).json({ message : "Invalid credentials"})
        }

        const isCorrect = await bcrypt.compare(password,user.password)
        
        if(!isCorrect)
        {
            res.status(400).json({ message : "Invalid credentials"})
        }

        generateToken(user._id,res)

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email: user.email
        })

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ messaage: "Internal Server Error"})
    }
}

export const logout= (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({ message : "Logged out Successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user)
        
    } catch (error) {
        console.log("Error in checkAuth controller",error.message)
        res.status(500).json({ message: "Internal Server Error "})
    }
}