import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    pickup :{
        type : {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type : [Number],
            required: true
        }
    },
    destination :{
        type : {
            type: String,
            enum: ['Point'],
            required : true
        },
        coordinates: {
            type : [Number],
            required: true
        }
    },
    fare : {
        type: Number,
        required: true},
    driverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Driver",
        required: true
    }
},{timestamps: true})

const Ride = mongoose.model("Ride",rideSchema)

export default Ride