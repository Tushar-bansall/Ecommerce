import { useEffect, useState} from 'react'
import './App.css'
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
import { useAuthStore } from './store/authStore'

function App() {
  const {authUser,checkAuth} = useAuthStore()
  const {authDriver,checkDriverAuth} = useDriverAuthStore()

  useEffect(()=>{
    const checkkAuth = async () => {
      try {
        checkAuth()
        if(authUser) return
      } catch (error) {
        console.log(error);
      }

      try {
        checkDriverAuth()
        if(authDriver) return
      } catch (error) {
        console.log(error);
      }
    }
  },[checkAuth,checkDriverAuth])


  return (
    <>
      <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />}/>
          <Route path='/login' element={authUser ? <HomePage /> : <LoginPage />}/>
          <Route path='/signup' element={authUser ? <HomePage /> : <SignupPage />}/>
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />}/>
          <Route path='/rides' element={(authUser || authDriver) ? <RidesPage /> : <Navigate to='/login' />}/>
          <Route path='/driverlogin' element={authDriver ? <DriverHomePage /> : <DriverLoginPage />}/>
          <Route path='/driversignup' element={authDriver ? <DriverHomePage /> : <DriverSignupPage />}/>
          <Route path='/driver' element={authDriver ? <DriverHomePage /> : <Navigate to="/driverslogin" />}/>
          <Route path='/driverprofile' element={authDriver ? <DriverProfilePage /> : <Navigate to="/driverslogin" />}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
