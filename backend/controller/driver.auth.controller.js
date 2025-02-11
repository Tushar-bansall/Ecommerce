import Driver from "../models/driver.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/token.js"
import Ride from "../models/rides.model.js"

export const signup= async (req,res)=>{
    const {fullName,email,password,phoneNo,license} = req.body
    try {
        if(!fullName || !email || !password || !phoneNo || !license )
          {  return res.status(400).json({ message : "All fields are required"})}

        if(password.length < 6) {
            return res.status(400).json({ message : "Password must be at least 6 characters"})
        }

        if(phoneNo.length < 10){
            return res.status(400).json({message: "Phone number must be 10 digits"})
        }

        const driver = await Driver.findOne({email});

        if(driver)
        {
            return res.status(400).json({ message: "User already exist with this email "})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt);
        const location = {
            type: "Point",
            coordinates: [0, 0]  // Assume longitude and latitude are provided in the request
          };

        const newDriver = new Driver({
            fullName,
            email,
            password: hashPass,
            phoneNo,
            license,
            location
        })

        if(newDriver)
        {
            generateToken(newDriver._id,res)
            await newDriver.save()

            res.status(201).json({
                _id:newDriver._id,
                fullName:newDriver.fullName,
                email:newDriver.email,
                phoneNo : newDriver.phoneNo,
                license : newDriver.license
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
        const driver = await Driver.findOne({email})

        if(!driver)
        {
            return res.status(400).json({ message : "Invalid credentials"})
        }

        const isCorrect = await bcrypt.compare(password,driver.password)
        
        if(!isCorrect)
        {
            res.status(400).json({ message : "Invalid credentials"})
        }

        generateToken(driver._id,res)

        res.status(200).json({
            _id:driver._id,
            fullName:driver.fullName,
            email:driver.email,
            phoneNo : driver.phoneNo,
            vehicleType: driver.vehicleType,
            vehicleRC: driver.vehicleRC,
            vehicleDescription: driver.vehicleDescription
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

export const getRides = async (req,res) => {
    try {
        const rides = await Ride.find({driverId : {$in : [req.user._id]}}).populate('userId','fullName').populate('driverId','fullName phoneNo vehicle')
        res.status(200).json(rides)
        
    } catch (error) {
        console.log("Error in getRides controller",error.message)
        res.status(500).json({ message: "Internal Server Error "})
    }
}


export const updateLocation = async (req,res) => {
    try {
        const driverId =req.user._id
        const {latitude,longitude} = req.body

        const newDriver = await Driver.findByIdAndUpdate(driverId,{location :{
            type:'Point',coordinates: [latitude,longitude]}},{new: true})
        res.status(200).json(newDriver)
    } catch (error) {
        console.log("Error in updateLocation controller",error.message)
        res.status(500).json({ message: "Internal Server Error "})
    }
}

export const getLocation = async (req,res) => {
    const {id} = req.params
    console.log(id);
    try {
        const driver = await Driver.findById(id)
        const location = driver.location.coordinates
        console.log(location);
        res.status(200).json(location)
    } catch (error) {
        console.log("Error in getLocation controller",error.message)
        res.status(500).json({ message: "Internal Server Error "})
    }
    
}

export const updateProfile = async (req,res) => {
    try {
        const driverId =req.user._id
        const {
            vehicleType,
            vehicleRC,
            vehicleDescription
          } = req.body

        const newDriver = await Driver.findByIdAndUpdate(driverId,{vehicleType,vehicleRC,vehicleDescription},{new: true})
        res.status(200).json(newDriver)
    } catch (error) {
        console.log("Error in updateLocation controller",error.message)
        res.status(500).json({ message: "Internal Server Error "})
    }
}