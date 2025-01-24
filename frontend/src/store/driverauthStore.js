import { create } from "zustand";
import {axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";


export const useDriverAuthStore = create( (set,get) => ({
    authDriver : null,
    isSigningUp : false,
    isLoggingIn : false,
    isCheckingDriverAuth:true,
    isUpdatingLocation : false,
    onlineDrivers: [],

    
    checkDriverAuth : async() => {
        try {
            const res = await axiosInstance.get("/api/driver/check");
            set({authDriver: res.data})
        } catch (error) {
            console.log("Error in checkAuth", error.message);
            set({authDriver: null})
        } finally{
            set({isCheckingDriverAuth:false})
        }
    },
    signup : async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/api/driver/signup",data);
            set({authDriver:res.data})
            toast.success("Account Created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isSigningUp : false})
        }
    },
    logout : async () => {
        try {
            await axiosInstance.post("/api/driver/logout")
            set({authDriver:null})
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    login : async (data) =>{
        set({isLoggingIn: true})
        try {          
            const res = await axiosInstance.post("/api/driver/login",data)
            set({authDriver:res.data})            
            toast.success("Logged In Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isLoggingIn : false})
        }
    },
    updateLocation : async (data) => {
        set({isUpdatingLocation: true})
        try {
            const res= await axiosInstance.put("/api/driver/updateLocation",data)
            set({authDriver : res.data})
            toast.success("Location successfully updated")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUpdatingLocation: false})
        }
    },
}))