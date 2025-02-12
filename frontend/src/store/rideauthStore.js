import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios"
import { useAuthStore } from "./useAuthStore";



export const useRideStore = create((set,get) => ({
    rides: [],
    drivers: [],
    markers: [],
    filteredDrivers: [],
    location : {latitude: 28.4750063,longitude: 77.0103535},
    setLocation : (data) => set({location : data}),
    setFilteredDrivers : (filteredDrivers) => set({filteredDrivers}),

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
            set({
              markers: get().drivers.map((driver) => ({
                icon: driver.vehicle,
                location: driver.location.coordinates
              }))
            });
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
      },
      checkDriver: async (data) => {
        const { filteredDrivers } = get();
      
        try {
          if (filteredDrivers.length === 0) return null; // No available filtered drivers
      
          // Define a helper function to handle the retry logic
          const tryCheckDriver = async (driver) => {
            try {
              const response = await axiosInstance.put(`api/ride/checkDriver/${driver._id}`, data);
              return response.data.accepted;
            } catch (error) {
              console.error("Error checking driver:", error);
              return false;
            }
          };
      
          // Loop through drivers until one accepts the ride or we run out of time
          let driver = null;
          let accepted = false;
          let retries = 0;
          const maxRetries = filteredDrivers.length; // Limit retries to the number of drivers
      
          while (retries < maxRetries && !accepted) {
            driver = filteredDrivers[retries];
            accepted = await tryCheckDriver(driver); // Check if this driver accepts the ride
            retries++;
      
            if (accepted) {
              return driver; // Return the first driver who accepts
            }
          }
      
          // If no driver accepted the ride, return null
          return null;
      
        } catch (error) {
          console.error("Error in checkDriver function:", error);
          return null;
        }
      },
      
  
      
}))