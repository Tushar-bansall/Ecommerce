import express from 'express'
import { protectRoute } from '../middleware/userProtectRoute.middleware.js'

import {bookRide,getRides,getDrivers,getRoutes, getPickup, getDestination,Pay, Verify,checkDriverAvailability} from "../controller/rides.controller.js"

const router = express.Router()

router.post("/book",protectRoute,bookRide)

router.get("/rides",protectRoute,getRides)
router.put("/checkDriver/:id",checkDriverAvailability)

router.put("/drivers",protectRoute,getDrivers)

router.put("/route",getRoutes)
router.put("/pickup",getPickup)
router.put("/destination",getDestination)
router.post("/payment",Pay)
router.post("/verify-payment",Verify)

export default router