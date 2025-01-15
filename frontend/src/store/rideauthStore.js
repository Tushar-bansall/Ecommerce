import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useRideStore = create((set,get) => ({
    rides: [],
    drivers: [],
    markers: [],
    addMarkers : (data) => set({markers: [...get().markers,data]}),
    
    location : {latitude: 28.4750063,longitude: 77.0103535},
    setLocation : (data) => set({location : data}),

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

    getDrivers: async() => {
        try {
            const res= await axiosInstance.put("/api/ride/drivers",get().location)
            set({drivers:res.data})
            set({markers : drivers.map((driver)=>{(
                        driver.location.coordinates
            )} )})
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