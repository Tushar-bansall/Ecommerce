import Driver from "../models/driver.model.js"
import Ride from "../models/rides.model.js";
import User from "../models/user.model.js";
import {config} from "dotenv"
import cloudinary from "../lib/cloudinary.js";
import Razorpay from "razorpay"
import crypto from "crypto"
import {io,getDriverSocketId} from "../lib/socket.js"

config()

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,  // Replace with your Razorpay Key ID
  key_secret: process.env.RZP_KEY_SECRET,  // Replace with your Razorpay Key Secret
});



export const bookRide = async (req,res) => {
  console.log(req.body);
    const {pickup,destination,fare,driverId,vehicle,image,distance,time} = req.body
    const userId = req.user._id
    try {
        const user = await User.findById(userId)

        if(!user){
            res.status(400).json({message: "No User exists"})
        }

        const response = await cloudinary.uploader.upload(image)
        console.log(response);

        const newRide = new Ride({
            userId,
            pickup ,
            destination ,
            fare,
            driverId,
            vehicle,
            map : response.secure_url,
            distance,
            time
        })

        if(newRide)
        {
            await newRide.save()
            newRide.populate('userId','fullName')
            newRide.populate('driverId','fullName phoneNo vehicle license')
            res.status(201).json(newRide)
        }
        else{
            res.status(400).send({ message : "Invalid Ride Data" })
        }

    } catch (error) {
        console.log("Error in bookRides controller", error)
        res.status(500).json({ messaage: "Internal Server Error"})
    }    
    
    
}

export const getRides = async (req,res) => {
    try {
        const rides = await Ride.find({userId : {$in : [req.user._id]}}).populate('userId','fullName').populate('driverId','fullName phoneNo vehicle')
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
                    $maxDistance : 20000
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
    console.log(pickupcoordinates,destinationcoordinates);
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
      const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${pickup}&filter=countrycode:in&format=json&apiKey=${process.env.SECOND_API_KEY}`,
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
      const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${Destination}&filter=countrycode:in&format=json&apiKey=${process.env.SECOND_API_KEY}`,
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

export const Pay =  async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const response = await razorpay.orders.create(options);
    res.status(201).json({
      id: response.id,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export const Verify = async (req, res) => {
  const { payment_id, order_id, signature } = req.body;
  try {
    const generated_signature = crypto
    .createHmac('sha256', process.env.RZP_KEY_SECRET)
    .update(order_id + "|" + payment_id)
    .digest('hex');

    if (generated_signature===signature) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid signature',
      });
  }
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
  }

  export const checkDriverAvailability = (req,res) => {
    try {
      const rideDetails = req.body;
      const driverId = req.params.id;
      let accepted = false; // Set default value
      
      const driverSocketId = getDriverSocketId(driverId);
      
      // Create a promise to handle the response asynchronously
      const rideAcceptedPromise = new Promise((resolve) => {
        io.to(driverSocketId).emit("New Ride", rideDetails, (response) => {
          accepted = response; // Update accepted value
          resolve(); // Resolve the promise once the response is received
        });
      });
      
      // Wait for the driver to respond before sending the response
      rideAcceptedPromise.then(() => {
        res.status(200).json({ accepted: accepted });
      });
      
    } catch (error) {
      res.status(500).json({message : "Internal Server Error"})
    }
  }
  