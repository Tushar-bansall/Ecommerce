import express from 'express'
import { driverProtectRoute } from '../middleware/driverProtectRoute.middleware.js'
import { signup,login,logout,checkAuth,getRides, updateLocation, getLocation,updateProfile } from '../controller/driver.auth.controller.js'

const router = express.Router()

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)
router.put('/updateProfile',driverProtectRoute,updateProfile)

router.get("/check",driverProtectRoute,checkAuth)

router.get("/rides",driverProtectRoute,getRides)

router.put("/updateLocation",driverProtectRoute,updateLocation)

router.get("/location/:id",getLocation)

export default router