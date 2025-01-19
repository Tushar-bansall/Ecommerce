import Driver from "../models/driver.model.js"
import Ride from "../models/rides.model.js";
import User from "../models/user.model.js";
import {config} from "dotenv"
import cloudinary from "../lib/cloudinary.js";

config()

export const bookRide = async (req,res) => {
    const {pickup,destination,fare,driverId,vehicle,image} = req.body
    const userId = req.user._id
    try {
        const user = await User.findById(userId)

        if(!user){
            res.status(400).json({message: "No User exists"})
        }

        const response = await cloudinary.uploader.upload(image)

        const newRide = new Ride({
            userId,
            pickup ,
            destination ,
            fare,
            driverId,
            vehicle,
            map : response.secure_url
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

export const getRoutes = async (req, res) => {
    const { pickupcoordinates, destinationcoordinates } = req.body;
  
    // Check if the coordinates are provided
    if (!pickupcoordinates || !destinationcoordinates) {
      return res.status(400).json({ message: 'Pickup and destination coordinates are required' });
    }
  
    const { latitude: pickupLat, longitude: pickupLng } = pickupcoordinates;
    const { latitude: destinationLat, longitude: destinationLng } = destinationcoordinates;
  
    try {
      // Build the URL dynamically with the coordinates
      const url = `https://api.geoapify.com/v1/routing?waypoints=${pickupLat},${pickupLng}|${destinationLat},${destinationLng}&mode=drive&apiKey=${process.env.API_KEY}`;
  
      // Fetch the routing data from Geoapify API
      const response = await fetch(url, { method: 'GET' });
  
      // Check if the response is successful (status 200)
      if (!response.ok) {
        throw new Error(`Geoapify API Error: ${response.statusText}`);
      }
  
      // Parse the response JSON
      const result = await response.json();
  
      // Check if the result contains routes
      if (result.features && result.features.length > 0) {
        return res.status(200).json(result.features[0]);
      } else {
        return res.status(404).json({ message: 'No routes found' });
      }
    } catch (error) {
      // Log the error and return a server error message
      console.error('Error in getRoutes controller:', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  


export const getPickup = async (req, res) => {
    const { pickup } = req.body;
  
    // Check if the coordinates are provided
    if (!pickup) {
      return res.status(400).json({ message: 'Pickup suggestion required' });
    }
  
    try {
      // Fetch the routing data from Geoapify API
      const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${pickup}&filter=countrycode:auto&format=json&apiKey=${process.env.SECOND_API_KEY}`,
      {
        method: 'GET',
      })
  
      // Check if the response is successful (status 200)
      if (!response.ok) {
        throw new Error(`Geoapify API Error: ${response.statusText}`);
      }
  
      // Parse the response JSON
      const result = await response.json();
  
      // Check if the result contains routes
      if (result) {
        return res.status(200).json(result.results);
      } else {
        return res.status(404).json({ message: 'No suggestions found' });
      }
    } catch (error) {
      // Log the error and return a server error message
      console.error('Error in getPickup controller:', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

export const getDestination = async (req, res) => {
    const { Destination } = req.body;
  
    // Check if the coordinates are provided
    if (!Destination) {
      return res.status(400).json({ message: 'Destination suggestion required' });
    }
  
    try {
      // Fetch the routing data from Geoapify API
      const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${Destination}&filter=countrycode:auto&format=json&apiKey=${process.env.SECOND_API_KEY}`,
      {
        method: 'GET',
      })
  
      // Check if the response is successful (status 200)
      if (!response.ok) {
        throw new Error(`Geoapify API Error: ${response.statusText}`);
      }
  
      // Parse the response JSON
      const result = await response.json();
  
      // Check if the result contains routes
      if (result) {
        return res.status(200).json(result.results);
      } else {
        return res.status(404).json({ message: 'No suggestions found' });
      }
    } catch (error) {
      // Log the error and return a server error message
      console.error('Error in getDestination controller:', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  