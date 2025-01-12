import express from 'express'
import { protectRoute } from '../middleware/userProtectRoute.middleware.js'

import {bookRide,getRides,getDrivers} from "../controller/rides.controller.js"

const router = express.Router()

router.post("/book",protectRoute,bookRide)

router.get("/rides",protectRoute,getRides)

router.get("/drivers",getDrivers)