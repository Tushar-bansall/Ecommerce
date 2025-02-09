import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios"
import {io} from "socket.io-client"
import { useAuthStore } from "./useAuthStore";

export const useRideStore = create((set,get) => ({
    rides: [],
    drivers: [],
    markers: [],
    socket:null,
    onlineDrivers:[],
    isCheckingDriver:false,
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
    connectSocket: () => {
        
        if(!useAuthStore.getState().authUser || get().socket?.connected)
            return

        const socket = io(BASE_URL,{
            query: {
                driverId : null
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

      socket.on("getOnlineDrivers",(data) => {
          const drs = data.filter((driver)=>get().drivers.includes(driver))
          set({onlineDrivers:drs})
      });
  },
  unsubscribeFromDrivers: () => {
      const socket = get().socket
      socket.off("getOnlineDrivers")
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
            console.log(get().drivers);
            set({
              markers: get().drivers.map((driver) => ({
                icon: driver.vehicle,
                location: driver.location.coordinates
              }))
            });
            console.log(get().markers);
        } catch (error) {
            console.log(error)
        }
    },

    bookRide: async (data) => {
        const {rides} = get()
        try {
            const res = await axiosInstance.post("/api/ride/book",data)
            console.log(res.data)
            set({rides : [...rides,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    checkDriver : async (data) => {
      set({isCheckingDriver:true})
      try {
        let res = false;
        let driver = null;
        const filteredDrivers = get().onlineDrivers.filter((driver) => driver.vehicle === data.vehicle);
        
        if (filteredDrivers.length === 0) return null; // No available drivers
    
        let timeoutId = setTimeout(async () => {
            let randomIndex;
            
            while (true) {
                randomIndex = Math.floor(Math.random() * filteredDrivers.length);
                if (randomIndex < filteredDrivers.length) break;
            }
    
            driver = filteredDrivers[randomIndex];
    
            res = await axiosInstance.get(`/checkDriver/${driver._id}`, data).data.accepted
    
            if (res) {
                clearTimeout(timeoutId); // ✅ Stop timeout when res is true
            }
        }, 60000);
    
        return driver;
    
    } catch (error) {
        console.error("Error selecting driver:", error);
        return null;
    }
     finally{
        set({isCheckingDriver:false})
      }
    },
    Payment : async (amount) => {
        return new Promise((resolve, reject) => {
          // Fetch the order ID from your backend
          axiosInstance.post('/api/ride/payment', { amount: amount })
            .then((orderResponse) => {
              const razorpayOrderId = orderResponse.data.id;
          
              const options = {
                key: 'rzp_test_65l34p9RqWEeq9', // Replace with your Razorpay Key ID
                amount: amount * 100, // Amount in paise
                currency: "INR",
                name: "ZappCab",
                description: "Payment for Ride",
                order_id: razorpayOrderId, // Get the order_id from the backend
                handler: async function (response) {
                  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
      
                  // Send these details to your backend for verification
                  try {
                    const verificationResponse = await axiosInstance.post('/api/ride/verify-payment', {
                      payment_id: razorpay_payment_id,
                      order_id: razorpay_order_id,
                      signature: razorpay_signature,
                    });
                    if (verificationResponse.data.success) {
                      resolve(true); // Payment verified successfully
                    } else {
                      reject('Payment verification failed');
                    }
                  } catch (error) {
                    reject('Error during payment verification');
                  }
                },
                prefill: {
                  name: useAuthStore.getState().authUser.fullName,
                  email: useAuthStore.getState().authUser.email,
                  contact: "9876543210"
                },
                modal: {
                  ondismiss: function () {
                    alert('Payment process was cancelled!');
                    reject('Payment cancelled');
                  }
                },
                theme: {
                  color: "#F37254"
                }
              };
          
              const rzp = new Razorpay(options);
              rzp.open();
            })
            .catch(error => {
              reject('Error fetching Razorpay order ID');
            });
        });
      }
      
}))