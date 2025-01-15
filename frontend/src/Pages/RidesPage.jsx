import React, { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useDriverAuthStore } from '../store/driverauthStore'
import { useRideStore } from '../store/rideauthStore'

const RidesPage = () => {

    const {rides,getDriverRides,getRides} = useRideStore()
    const {authUser} = useAuthStore()
    const {authDriver} = useDriverAuthStore()

    useEffect(()=>{
        authUser && getRides()
        authDriver && getDriverRides()
    },[getDriverRides,getRides])

  return (
    <div className="overflow-x-auto">
        <table className="table table-xs">
            <thead>
            <tr>
                <th>Customer Name</th>
                <th>Driver Name</th>
                <th>Driver Phone Number</th>
                <th>Vehicle</th>
                <th>Pickup</th>
                <th>Destination</th>
                <th>Fare</th>
            </tr>
            </thead>
            <tbody>
            {
                rides.map((ride)=>(
                    <tr key={ride._id}>
                        <td>ride.userId.fullName</td>
                        <td>ride.driverId.fullName</td>
                        <td>ride.driverId.phoneNo</td>
                        <td>ride.driverId.vehicle</td>
                        <td>ride.pickup</td>
                        <td>ride.destination</td>
                        <td>ride.fare</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
  )
}

export default RidesPage