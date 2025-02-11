import React,{ useEffect, useState} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import RidesPage from './Pages/RidesPage'
import ProfilePage from './Pages/ProfilePage'
import DriverSignupPage from './Pages/DriverSignupPage'
import DriverLoginPage from './Pages/DriverLoginPage'
import DriverProfilePage from './Pages/DriverProfilePage'
import DriverHomePage from './Pages/DriverHomePage'
import { Toaster } from 'react-hot-toast'
import { useDriverAuthStore } from './store/driverauthStore'
import { useAuthStore } from './store/useAuthStore'
import Navbar from "./Components/Navbar"
import Dashboard from './Pages/Dashboard'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const {authDriver,checkDriverAuth,isCheckingDriverAuth} = useDriverAuthStore()


  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  useEffect(() => {
    checkDriverAuth()
  }, [checkDriverAuth])
  

  if((isCheckingAuth && !authUser) || (isCheckingDriverAuth && !authDriver)) 
    return (
    <div className=" flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-md"> </span>
    </div>
    );


  return (
    <div>
      <Navbar />
      <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' /> }/>
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <LoginPage />}/>
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignupPage />}/>
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' /> }/>
          <Route path='/rides' element={(authUser|| authDriver) ? <RidesPage /> : <Navigate to='/login' /> }/>
          <Route path='/driver' element={authDriver ? (authDriver.vehicleType ? <DriverHomePage /> : <Navigate to='/driverprofile'/>) : <Navigate to='/driverlogin' /> }/>
          <Route path='/driverlogin' element={authDriver ? <Navigate to='/dashboard' /> : <DriverLoginPage />}/>
          <Route path='/driversignup' element={authDriver ? <Navigate to='/dashboard' /> : <DriverSignupPage />}/>
          <Route path='/driverprofile' element={authDriver ? <DriverProfilePage /> : <Navigate to='/driverlogin' /> }/>
          <Route path="/dashboard" element={authDriver ? (authDriver.vehicleType ? <Dashboard /> : <Navigate to='/driverprofile'/>)  : <Navigate to='/driverlogin' /> } />
          </Routes>
      <Toaster />
    </div>
  )
}

export default App
