import { create } from "zustand";
import {axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";


export const useAuthStore = create( (set,get) => ({
    authUser : null,
    isSigningUp : false,
    isCheckingAuth : true,
    isLoggingIn : false,
    checkAuth : async() => {
        try {
            const res = await axiosInstance.get("/api/auth/check");
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in checkAuth", error.message);
        } finally {
            set({isCheckingAuth: false})
        }
    },
    signup : async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/api/auth/signup",data);
            set({authUser:res.data})
            toast.success("Account Created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isSigningUp : false})
        }
    },
    logout : async () => {
        try {
            await axiosInstance.post("api/auth/logout")
            set({authUser:null})
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    login : async (data) =>{
        set({isLoggingIn: true})
        try {          
            const res = await axiosInstance.post("/api/auth/login",data)
            set({authUser:res.data})            
            toast.success("Logged In Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isLoggingIn : false})
        }
    },
    handleCredentialResponse : async (response) => {
    
        const id_token = response.credential;
        try {
            const res= await axiosInstance.post("/api/auth/google",{
                id_token: id_token
            })
            
            set({authUser:res.data})            
            toast.success("Logged In Successfully")

        } catch (error) {
            console.log("Error in checkAuth", error.message);
            set({authUser: null})
        }
    },

}))