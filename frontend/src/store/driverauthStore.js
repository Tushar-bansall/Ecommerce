import { create } from "zustand";
import {axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import {io} from "socket.io-client"


const BASE_URL = import.meta.env.MODE ==='development' ? "http://localhost:8001" : "/"

export const useDriverAuthStore = create( (set,get) => ({
    authDriver : null,
    isSigningUp : false,
    isLoggingIn : false,
    currentRide : null,
    newRides : [],
    isCheckingDriverAuth:true,
    isUpdatingProfile:false,
    socket :null,
    setCurrentRide : (currentRide) => set({currentRide}),
    connectSocket: () => {
        const {authDriver} = get()
        if(!authDriver || get().socket?.connected)
            return

        const socket = io(BASE_URL,{
            query: {
                driverId : authDriver._id,
                userId : ""
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
    setAccepted: (rideIndex) => {
        set((state) => {
            const updatedRides = state.newRides
            !get().currentRide && updatedRides.map((ride, index) => {
                if (index === rideIndex) {
                    return { ...ride, accepted: true };
                }
                return ride;
            });
    
            return {
                newRides: updatedRides,
                currentRide: state.newRides[rideIndex],
            };
        });
    },
    
    subscribeToRides: () => {
      const socket = get().socket

      socket?.on("newRide",(data,callback) => {
        const ride = {...data,accepted:false}
          set({newRides:[...get().newRides,ride]})
          if(get().currentRide)
          {
            callback(false)
            return
          }
          setTimeout(()=>{
            callback(newRides[0].accepted)
            set({newRides : get().newRides.shift()})
          },60000)
      })
  },
  unsubscribeFromRides: () => {
      const socket = get().socket
      socket?.off("newRide")
  },
    
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
    Driverlogout : async () => {
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
        try {
            const res= await axiosInstance.put("/api/driver/updateLocation",data)
            set({authDriver : res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    getLocation : async (driverId) =>
    {
      try {
          const res = await axiosInstance.get(`/api/driver/location/${driverId}`)
          return res
      } catch (error) {
          toast.error(error.response.data.message)
      }
    },
    updateProfile : async (data) => {
        set({isUpdatingProfile : true})
        try {
            const res = await axiosInstance.put('/api/driver/updateProfile',data)
            toast.success("Profile Updated")
            set({authDriver : res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUpdatingProfile : false})
        }
    }
    
}))