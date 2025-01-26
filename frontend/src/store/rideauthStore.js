import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useRideStore = create((set,get) => ({
    rides: [],
    drivers: [],
    markers: [],
    
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
            console.log(get().drivers);
            set({markers: get().drivers.map((driver)=>driver.location.coordinates)})
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
    selectDriver : (vehicle) => {
        try {
            console.log(get().drivers);
            const filteredDrivers = get().drivers.filter((driver)=>driver.vehicle === vehicle)
            console.log(filteredDrivers);
            const select = filteredDrivers[0]
            console.log(select);
            return select
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
                  name: "Customer Name",
                  email: "customer@example.com",
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