import Driver from "../models/driver.model";
import Ride from "../models/rides.model";
import User from "../models/user.model";

export const bookRide = async (req,res) => {
    const {pickupLong,pickupLat,destinationLong,destinationLat,fare,driverId} = req.body
    const userId = req.user._id
    try {
        const user = await User.findById(userId)

        if(!user){
            res.status(400).json({message: "No User exists"})
        }

        const newRide = new Ride({
            userId,
            pickup : {type : 'Point', coordinates : [{pickupLong},{pickupLat}]},
            destination : {type : 'Point', coordinates : [{destinationLong},{destinationLat}]},
            fare,
            driverId
        })

        if(newRide)
        {
            await newRide.save()
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
        const rides = await Ride.find({userId : {$in : [req.user._id]}})
        res.status(200).json(rides)   
    } catch (error) {
        console.log("Error in getRides controller", error.message)
        res.status(500).json({ messaage: "Internal Server Error"})
    }
}

export const getDrivers = async (req,res) => {
    const {vehicle,userLatitude,userLongitude} = req.body
    try {
        const drivers = await Driver.find({
            vehicle, location:{
                $near: {
                    $geometry: {
                        type:'Point',
                        coordinates: [userLongitude,userLatitude]
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