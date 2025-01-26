import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    pickup :{
        type : String,
        required: true
    },
    
    destination :{
        type : String,
        required: true
    },
    fare : {
        type: Number,
        required: true},
    driverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Driver",
        required: true
    },
    vehicle : {
        type: String,
        required: true
    },
    map : {
        type: String,
        required: true
    },
    distance : {
        type: Number,
        required: true
    },
    time : {
        type: Number,
        required: true
    }

},{timestamps: true})

const Ride = mongoose.model("Ride",rideSchema)

export default Ride