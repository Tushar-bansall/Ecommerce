import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useRideStore = create((set,get) => ({
    rides: [],
    drivers: [],
    markers: [],
    PaymentConfirm:false,
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
    selectDriver : (vehicle) => {
        try {
            const filteredDrivers = get().drivers.filter((driver)=>driver.vehicle === vehicle)
            const randomIndex = Math.floor(Math.random() * filteredDrivers.length);
            return filteredDrivers[randomIndex]
        } catch (error) {
            return null
        }
    },
    Payment : async(amount) => {
        // Fetch the order ID from your backend
        const orderResponse = await axiosInstance.post('/api/ride/payment',{ amount: amount })
        const razorpayOrderId = orderResponse.data.id;
    
        const options = {
          key: 'rzp_test_65l34p9RqWEeq9', // Replace with your Razorpay Key ID
          amount: amount * 100, // Amount in paise
          currency: "INR",
          name: "ZappCab",
          description: "Payment for Ride",
          order_id: razorpayOrderId, // Get the order_id from the backend
          handler: async function(response) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            // Send these details to your backend for verification
            const verificationResponse = await axiosInstance.post('/api/ride/verify-payment', {
                payment_id:razorpay_payment_id,
                order_id:razorpay_order_id,
                signature:razorpay_signature,
            });
            if (verificationResponse.data.success) {
                // Payment is verified
                console.log("Payment verified successfully");
                set({PaymentConfirm:true})
                // Handle success (e.g., update UI, store data, etc.)
            } else {
                // Payment verification failed
                console.log("Payment verification failed", result.error);
            }},
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9876543210"
          },
          modal: {
            ondismiss: function() {
              alert('Payment process was cancelled!');
            }
          },
          theme: {
            color: "#F37254"
          }
        };
    
        const rzp = new Razorpay(options);
        rzp.open();
      }
}))