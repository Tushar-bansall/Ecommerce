import { create } from "zustand";
import {axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import { io } from "socket.io-client";



const BASE_URL = import.meta.env.MODE ==='development' ? "http://localhost:8001" : "/"

export const useAuthStore = create( (set,get) => ({
    authUser : null,
    isSigningUp : false,
    isCheckingAuth : true,
    isLoggingIn : false,
    onlineDrivers : [],
    socket:null,
    connectSocket: () => {
        
        if(!get().authUser || get().socket?.connected)
            return

        const socket = io(BASE_URL,{
            query: {
                driverId : "",
                userId : get().authUser._id
            }
        })
        socket.connect()
        set({socket : socket})
    },
    disconnectSocket: () => {
        if(get().socket?.connected)
        {
            get().socket.disconnect()
        }
    },
    subscribeToDrivers: () => {
      const socket = get().socket
      socket?.on("getOnlineDrivers",(data) => {
        console.log(data);
          set({onlineDrivers : data})
      });
    },
    unsubscribeFromDrivers: () => {
        const socket = get().socket
        socket?.off("getOnlineDrivers")
    },
    checkAuth : async() => {
        try {
            const res = await axiosInstance.get("/api/auth/check");
            set({authUser: res.data})
            get().connectSocket()
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
            get().connectSocket()
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
            get().disconnectSocket()
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
            get().connectSocket()
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
    }
}))