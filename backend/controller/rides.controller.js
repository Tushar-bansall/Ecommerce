import Driver from "../models/driver.model.js"
import Ride from "../models/rides.model.js";
import User from "../models/user.model.js";

export const bookRide = async (req,res) => {
    const {pickup,destination,fare,driverId} = req.body
    const userId = req.user._id
    try {
        const user = await User.findById(userId)

        if(!user){
            res.status(400).json({message: "No User exists"})
        }

        const newRide = new Ride({
            userId,
            pickup ,
            destination ,
            fare,
            driverId
        })

        if(newRide)
        {
            await newRide.save()
            newRide.populate('userId','fullName')
            newRide.populate('driverId','fullName phoneNo vehicle')
            res.status(201).json(newRide)
        }
        else{
            res.status(400).send({ message : "Invalid Ride Data" })
        }

    } catch (error) {
        console.log("Error in bookRides controller", error.message)
        res.status(500).json({ messaage: "Internal Server Error"})
    }    
    
    
}

export const getRides = async (req,res) => {
    try {
        const rides = await Ride.find({userId : {$in : [req.user._id]}}).populate('userId','fullName')
        rides.populate('driverId','fullName phoneNo vehicle')
        res.status(200).json(rides)   
    } catch (error) {
        console.log("Error in getRides controller", error.message)
        res.status(500).json({ messaage: "Internal Server Error"})
    }
}

export const getDrivers = async (req,res) => {
    const {latitude,longitude} = req.body
    console.log(latitude);
    try {
        const drivers = await Driver.find({
            location:{
                $near: {
                    $geometry: {
                        type:'Point',
                        coordinates: [latitude,longitude]
                    },
                    $maxDistance : 5000
                }
        }})
        res.status(200).json(drivers)   
    } catch (error) {
        console.log("Error in getDrivers controller", error.message)
        res.status(500).json({ messaage: "Internal Server Error"})
    }
}