import React, { useState } from 'react'
import { useRideStore } from '../store/rideauthStore';
import toast from 'react-hot-toast';

const RideTrack = ({ 
    rideStart = false, 
    droptime = 0, 
    pickuptime = 0, 
    driverId = {}, 
    pickup = '', 
    destination = '',
    amt = 0 ,
    paid = false,
    setPaid = ()=>{}
}) => {
    
    const [paying,setPaying] = useState(false)
    const vehicleUrl = (driverId?.vehicleType==="Bike" || driverId?.vehicleType==="Auto") ? `${driverId?.vehicleType}.png` : `${driverId?.vehicleType}.svg`
    console.log(vehicleUrl);
    const {Payment} = useRideStore()
  return (
    <div className='w-full md:max-w-[calc(40vw)] '>
        <div className='bg-black text-white rounded-t-2xl md:rounded-t-none w-full flex justify-between p-4 h-fit'>
            <p>⏳ {rideStart ? "You will reach your destination in" : "The driver will reach pickup location in"}</p>            
            <div className="badge badge-neutral text-xxs font-medium">{rideStart ? (droptime/60).toFixed(2)  : (pickuptime/60).toFixed(2)} Mins</div>
        </div>
        <div className='bg-white rounded-2xl md:rounded-none p-4 pt-2 h-fit '>
            <div className='divider md:hidden mx-auto w-12 my-1'></div>
            <div className="shadow-xl rounded-2xl flex p-4 gap-3">         
                <div className='flex-col w-full my-auto'>
                    <p className='text-md font-semibold text-gray-950'>{driverId?.vehicleRC}</p>
                    <p className='text-sm font-medium text-gray-950'>{driverId?.vehicleDescription}</p>
                </div>
                <div className='flex flex-col'>
                    <div className="w-24 h-24 relative">
                            <img src={vehicleUrl} className="w-full h-full object-cover rounded-2xl" />
                            <div className="badge bg-white border-0 text-gray-950 absolute bottom-1 shadow-black shadow-md left-1/3 transform -translate-x-1/2 p-0.5 text-xxs w-fit">{driverId.vehicleType}</div>
                    </div>
                 </div>
            </div>
            <div className='flex w-full pt-4 justify-between '>
                <div className='flex gap-3'>
                    <div className="avatar flex flex-col">
                        <div className="w-12 h-13 relative">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="w-full h-full object-cover rounded-2xl" />
                            <div className="badge bg-white border-0 text-gray-950 absolute -bottom-1 left-1/2 transform -translate-x-1/2 p-0.5 text-xxs w-fit">4.5⭐</div>
                        </div>
                    </div>
                    <div className='flex flex-col my-auto'>
                        <p className='text-base text-gray-950 font-semibold'>{driverId?.fullName}</p>
                        <p className='text-sm'>Top Rated Driver 🏆</p>
                    </div>
                </div>
                <div className='flex gap-3 my-auto'>
                    <a href={`tel:+91 ${driverId.phoneNo}`}>
                    <svg style={{ fill: "#080808" }} className='w-6 h-6 ' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508 508" xml:space="preserve" fill="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path style={{ fill: "#080808" }} d="M254,28.3C129.5,28.3,28.2,129.5,28.2,254S129.5,479.8,254,479.8S479.8,378.5,479.8,254 S378.5,28.3,254,28.3z"></path> 
                            <path style={{ fill: "#0a0a0a" }} d="M119.6,162.2c3.8,72.1,153.9,222.2,226.3,226.2c7-0.8,24.9-20.2,40.2-42.8l-45.7-45.7l-30,30 c-5.3,5.3-14.7,5.3-20,0L178.1,217.6c-5.5-5.5-5.5-14.4,0-20l30-30L162.4,122C139.7,137.3,120.3,155.2,119.6,162.2z"></path> 
                            <path style={{ fill: "#fbfcfe" }} d="M414.1,333.7l-63.8-63.8c-5.3-5.3-14.7-5.3-20,0l-30,30L208,207.6l30-30c5.5-5.5,5.5-14.4,0-20 l-63.8-63.8c-4.6-4.6-11.8-5.5-17.4-2c-20.2,12.4-67,44.2-65.5,71.6c4.7,87.7,167,248.6,254.6,253.2c27,0,58.1-45.9,70.2-65.6 C419.5,345.5,418.7,338.3,414.1,333.7z M345.9,388.4c-72.4-4-222.5-154.1-226.3-226.2c0.7-7,20.1-25,42.8-40.3l45.7,45.7l-30,30 c-5.5,5.5-5.5,14.4,0,20l112.3,112.3c5.3,5.3,14.7,5.3,20,0l30-30l45.7,45.7C370.8,368.2,352.9,387.6,345.9,388.4z"></path> 
                            <path style={{ fill: "#ffffff" }} d="M254,0C113.9,0,0,113.9,0,254s113.9,254,254,254s254-113.9,254-254S394.1,0,254,0z M254,479.8 C129.5,479.8,28.2,378.5,28.2,254S129.5,28.2,254,28.2S479.8,129.5,479.8,254S378.5,479.8,254,479.8z"></path>
                        </g>
                    </svg>
                    </a>
                    <a href={`https://wa.me/91${driverId.phoneNo}?text=Hello,%20I%20booked%20cab%20How%20time%20till%20you%20arrive?`}>
                    <svg style={{ fill: "#ffffff" }} className='w-6 h-6' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-64.8 -64.8 249.60 249.60" enable-background="new 0 0 120 120" xml:space="preserve" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0">
                            <rect x="-64.8" y="-64.8" width="249.60" height="249.60" rx="124.8" fill="#0a0a0a" strokewidth="0"></rect>
                        </g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path style={{ fill: "#ffffff" }} d="M60,15.166C28.611,15.166,3.166,34.343,3.166,58c0,11.58,6.107,22.079,16.015,29.789l0.016,25.699L48.9,100.012 c3.591,0.535,7.3,0.822,11.1,0.822c31.389,0,56.834-19.178,56.834-42.834C116.834,34.343,91.389,15.166,60,15.166z M36.074,67 c-4.418,0-8-3.582-8-8c0-4.418,3.582-8,8-8c4.418,0,8,3.582,8,8C44.074,63.418,40.492,67,36.074,67z M59.972,67 c-4.418,0-8-3.582-8-8c0-4.418,3.582-8,8-8s8,3.582,8,8C67.973,63.418,64.391,67,59.972,67z M83.542,67c-4.419,0-8-3.582-8-8 c0-4.418,3.581-8,8-8s8,3.582,8,8C91.542,63.418,87.961,67,83.542,67z"></path> 
                        </g>
                    </svg>
                    </a>
                </div>
            </div>
            <div className='divider my-2'></div>
            <div className=' bg-white flex '>
                <svg className='my-auto' fill="#000000" height="80px" width="80px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" xml:space="preserve" transform="matrix(1, 0, 0, -1, 0, 0)rotate(-45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="turf-destination"> <path d="M26.483,83.137c-5.401,0-9.796-4.395-9.796-9.796s4.395-9.796,9.796-9.796s9.795,4.395,9.795,9.796 S31.885,83.137,26.483,83.137z M26.483,67.545c-3.196,0-5.796,2.6-5.796,5.796s2.6,5.796,5.796,5.796s5.795-2.6,5.795-5.796 S29.679,67.545,26.483,67.545z"></path> <circle cx="73.178" cy="26.646" r="7.796"></circle> <polygon points="64.243,35.212 55.574,37.534 58.04,40 35.147,62.894 36.561,64.308 59.454,41.414 61.921,43.881 "></polygon> </g> <g id="Layer_1"> </g> </g></svg>
                <div className='flex flex-col gap-2'>
                    <div className='flex-col'>
                        <p className='text-xs'>Start Location</p>
                        <p className='text-base text-gray-950 font-medium'>{pickup}</p>
                    </div>
                    <div className='flex-col'>
                        <p className='text-xs'>Your Destination</p>
                        <p className='text-base text-gray-950 font-medium'>{destination}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex bg-white justify-between px-2 p-1.5 border-t-2 border-gray-700 items-center'>
            <p className=' text-black font-semibold'>₹ {amt}</p>
            {paid ? 
            (<button className=' btn w-[calc(20vw)] text-white disabled'>
                Paid
            </button>)
            :
            (
                
                    paying 
                    ? 
                        <button className="btn  w-[calc(20vw)]"><span className="loading loading-spinner"></span>Paying</button>
                    :
                        <button onClick={async()=>{
                            setPaying(true)
                            const res = await Payment(amt)
                            if(res)
                            {
                                setPaid(true)
                                setPaying(false)
                            }
                            else toast.error("Payment Failed")
                        }} className='btn btn-success btn-outline  w-[calc(20vw)]'>
                            Pay Now
                        </button>
                
            )}
        </div>
    </div>
  )
}

export default RideTrack;
