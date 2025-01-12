import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    pickup : [String],
    destination : [String],
    fare : Number,
    driverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Driver"
    }
},{timestamps: true})

const Ride = mongoose.model("Ride",rideSchema)

export default Ride