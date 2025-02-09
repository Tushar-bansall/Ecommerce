import React from 'react'
import { useDriverAuthStore } from '../store/driverauthStore'

const NewRide = ({ride,index}) => {
    const {setAccepted}= useDriverAuthStore()
  return (
    <div className=' bg-white z-40 shadow-lg p-2'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <img src='user.png' className='w-9 h-9 rounded-lg' />
          <div className='flex flex-col gap-1'>
              <p className=' text-lg font-semibold text-black'>{ride.user.fullName}</p>
              <p>Rider</p>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <p className=' text-lg font-semibold text-black'>₹ {ride.fare}</p>
          <p className='text-sm'>{(ride.distance / 1000).toFixed(2)} km</p>
        </div>
        <div className='flex '>
          <svg className='my-auto' fill="#000000" height="80px" width="80px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" xml:space="preserve" transform="matrix(1, 0, 0, -1, 0, 0)rotate(-45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="turf-destination"> <path d="M26.483,83.137c-5.401,0-9.796-4.395-9.796-9.796s4.395-9.796,9.796-9.796s9.795,4.395,9.795,9.796 S31.885,83.137,26.483,83.137z M26.483,67.545c-3.196,0-5.796,2.6-5.796,5.796s2.6,5.796,5.796,5.796s5.795-2.6,5.795-5.796 S29.679,67.545,26.483,67.545z"></path> <circle cx="73.178" cy="26.646" r="7.796"></circle> <polygon points="64.243,35.212 55.574,37.534 58.04,40 35.147,62.894 36.561,64.308 59.454,41.414 61.921,43.881 "></polygon> </g> <g id="Layer_1"> </g> </g></svg>
          <div className='flex flex-col gap-1.5'>
              <div className='flex-col'>
                  <p className='text-xs'>Pickup</p>
                  <p className='text-base text-gray-950 font-medium'>{pickup}</p>
              </div>
              <div className='divider m-0 p-0' />
              <div className='flex-col'>
                  <p className='text-xs'>Destination</p>
                  <p className='text-base text-gray-950 font-medium'>{destination}</p>
              </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <button className='btn btn-md btn-error btn-outline'>Reject</button>
          <button onClick={()=>{setAccepted(index)}} className='btn btn-md btn-success btn-outline'>Accept</button>
        </div>
      </div>
        
    </div>
  )
}

export default NewRide