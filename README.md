💬 ZappCab – Online Cab Booking Platform 🚖  
--------------------------------------------------------------

ZappCab is a MERN-stack online cab booking platform offering seamless ride booking, live driver tracking, secure payments with Razorpay, Google authentication, and route tracking. Designed for convenient and reliable travel, ZappCab ensures a user-friendly and secure experience for both riders and drivers, featuring 3D vehicle previews and Geoapify-powered maps.

--------------------------------------------------------------

🌟 Features  
🔹 Cab Booking & Real-Time Tracking  
✅ Instant Cab Booking – Book rides quickly with just a few taps.  
✅ Live Driver Tracking – Track the driver's location in real time using Geoapify.  
✅ Route Tracking – View the complete route and estimated arrival time on an interactive map container.  
✅ Ride Page – Access previous rides with details like date, time, and fare.  

🔹 3D Vehicle Model Integration  
✅ Vehicle Selection – Check the type of vehicle before booking.  
✅ 3D Model Preview – Interactive 3D models to visualize car types and sizes.  

🔹 Payment Integration  
✅ Secure Payments – Pay seamlessly using Razorpay integration.  
✅ Multiple Payment Options – Choose from cards, UPI, or digital wallets.  

🔹 User Authentication & Security  
✅ Google Authentication – Quick sign-in with Google.  
✅ Secure Sign-up/Login – Register using email/password securely.  
✅ Session Management – Stay logged in across devices.  
✅ JWT-Based Authentication – Secure and reliable login system.  

🔹 User & Driver Profile Management  
✅ User Profiles – Update personal details and profile picture.  
✅ Driver Dashboard – Complete statistics on rides completed, earnings, and user ratings.  

🔹 Ride Management & Notifications  
✅ Ride Scheduling – Schedule rides for a future date and time.  
✅ Notifications – Get real-time alerts for ride booking, driver arrival, and ride completion.  
✅ Fare Estimation – Calculate estimated fares based on distance and time.  

🔹 Terms & Conditions  
✅ Terms & Conditions Page – Detailed policies and guidelines for users and drivers.  
✅ Privacy Policy – Information on data usage and user privacy.  

--------------------------------------------------------------

🛠 Tech Stack  
**Frontend:**  
- React.js (Vite) – Fast UI rendering for a seamless user experience.  
- Tailwind CSS – Responsive and modern styling.  
- Socket.io – Real-time communication for live tracking.  
- Zustand – Efficient state management.  
- Three.js – 3D model integration for vehicle previews.  

**Backend:**  
- Node.js & Express.js – Robust API server.  
- MongoDB – Database for storing users, drivers, rides, and payments.  
- JWT (JSON Web Tokens) – Secure authentication.  
- Socket.io – Real-time updates for driver tracking.  
- Google OAuth – Secure Google authentication.  

**Cloud Storage & Services:**  
- Razorpay – Secure and seamless payment integration.  
- Geoapify – Real-time location tracking and route management with interactive map containers.  

--------------------------------------------------------------

🚀 Getting Started  
1️⃣ **Clone the Repository**  
```
git clone https://github.com/Tushar-bansall/Cab-booking.git
cd Cab-booking
```

2️⃣ **Install Dependencies**  
```
npm run build
```

3️⃣ **Set Up Environment Variables**  
Create a `.env` file in the server folder and add:  
```
MONGO_URI=<your_mongo_database_url>
JWT_SECRET=<your_secret_key>
RAZORPAY_KEY_ID=<your_razorpay_key_id>
RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GEOAPIFY_API_KEY=<your_geoapify_api_key>
PORT=5000
NODE_ENV=development
```

4️⃣ **Build and Run the Application**  
```
npm run start
```

--------------------------------------------------------------

🎥 Live Demo  
🔗 https://zappcab.onrender.com 

🚖 Book rides, track drivers, preview vehicles in 3D, and travel conveniently with ZappCab! 🚀
