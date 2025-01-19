import express from 'express'
import { protectRoute } from '../middleware/userProtectRoute.middleware.js'

import {bookRide,getRides,getDrivers,getRoutes, getPickup, getDestination} from "../controller/rides.controller.js"

const router = express.Router()

router.post("/book",protectRoute,bookRide)

router.get("/rides",protectRoute,getRides)

router.put("/drivers",getDrivers)

router.put("/route",getRoutes)
router.put("/pickup",getPickup)
router.put("/destination",getDestination)

export default router