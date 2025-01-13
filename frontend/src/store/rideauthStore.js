import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useRideStore = create((set,get) => ({
    rides: [],
    drivers: [],

    getDriverRides : async () => {
        try {
            const res= await axiosInstance.get("/api/driver/rides")
            set({rides : res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    getRides: async() => {
        try {
            const res= await axiosInstance.get("/api/ride/rides")
            set({rides:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } 
    },

    getDrivers: async(data) => {
        try {
            const res= await axiosInstance.get("/api/ride/drivers",data)
            set({drivers:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    bookRide: async (data) => {
        const {rides} = get()
        try {
            const res = await axiosInstance.post("/api/ride/book",data)
            set({rides : [...rides,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
}))