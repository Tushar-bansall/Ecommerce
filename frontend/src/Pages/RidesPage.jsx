import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useDriverAuthStore } from '../store/driverauthStore'
import { useRideStore } from '../store/rideauthStore'

const RidesPage = () => {

    const {rides,getDriverRides,getRides} = useRideStore()
    const {authUser} = useAuthStore()
    const {authDriver} = useDriverAuthStore()
    const [selectedRide,setSelectedRide] = useState(null)

    useEffect(()=>{
        authUser && getRides()
        authDriver && getDriverRides()
    },[rides,getDriverRides,getRides])

  return (
    <div className=' bg-slate-50 flex-col space-y-6'>
        <div className="navbar bg-white flex-col items-start pl-5">
            <p className="text-xl font-bold text-gray-950">Rides History</p>
            <p className='text-md font-medium'>Showing all your rides history</p>
        </div>
        {
            rides.map((ride)=>(
                <div onClick={()=>{setSelectedRide(ride);document.getElementById('my_modal_5').showModal()}} key={ride._id} className='bg-white rounded-lg flex-col w-[calc(96vw)] mx-auto p-4 space-y-2 cursor-pointer'  >
                    <div className='flex w-full justify-between'>
                        <div className='flex gap-1'>
                            <svg fill="#4dcb34" className='my-auto' height="18px" width="18px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Location-Pin-Filled"> <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> </g> </g></svg>
                            <div className='flex-col'>
                                <p className=' text-xs sm:text-sm md:text-base text-gray-950'>{ride.pickup}</p>
                                <p className='text-xxs md:text-xs'>Pickup</p>
                            </div>
                        </div>
                        <div className='flex-col'>
                            <p className=' text-sm'>Payment</p>
                            <p className='text-xxs text-green-700 bg-green-400/15 rounded-2xl p-0.5 font-medium text-center'>₹ {ride.fare}</p>
                        </div>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className='flex gap-1'>
                            <svg fill="#e81111" className='my-auto' height="18px" width="18px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" stroke="#e81111"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Location-Pin-Filled"> <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> </g> </g></svg>
                            <div className='flex-col'>
                                <p className='text-xs sm:text-sm md:text-base text-gray-950'>{ride.destination}</p>
                                <p className='text-xxs md:text-xs'>Destination</p>
                            </div>
                        </div>
                        <div className='flex-col'>
                            <p className=' text-sm'>Distance</p>
                            <p className='text-xxs font-medium text-gray-950 text-center'>{(ride.distance / 1000).toFixed(2)} km</p>
                        </div>
                    </div>
                </div>
            ))
        }
        
        {selectedRide && 
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box w-[calc(96vw)] h-screen">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-20"><svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#0d0d0d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="#ffffff"> <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg></button>
                </form>
                <div className=' p-1 flex-col h-fit'>
                    <img src={selectedRide.map} className='absolute w-[calc(100vw)] inset-0 z-0 h-full'/>
                    <div className='z-10 relative -top-10 bg-white rounded-2xl p-4 w-fit space-y-0 mx-auto'>
                        <div className='flex gap-1 mr-20'>
                            <svg fill="#4dcb34" className='my-auto' height="18px" width="18px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Location-Pin-Filled"> <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> </g> </g></svg>
                            <div className='flex-col'>
                                <p className='text-xs'>Pickup point</p>
                                <p className='text-base text-gray-950'>{selectedRide.pickup}</p>
                               
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className='flex gap-1'>
                            <svg fill="#e81111" className='my-auto' height="18px" width="18px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" stroke="#e81111"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Location-Pin-Filled"> <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> </g> </g></svg>
                            <div className='flex-col'>
                                <p className='text-xs'>Where to go?</p>
                                <p className='text-base text-gray-950'>{selectedRide.destination}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className='z-10 relative mx-auto top-52 sm:-bottom-36 w-full bg-white rounded-2xl px-4 py-2 '>
                            
                        <div className="shadow-xl rounded-2xl flex p-4 gap-3">
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <div className='flex-col w-full'>
                                <div className='flex justify-between text-base text-gray-950 '>
                                    <p >{authUser ? selectedRide.driverId.fullName : selectedRide.userId.fullName}</p>
                                    <p >{selectedRide.vehicleType}</p>
                                
                                </div>
                                <div className="flex text-xs">
                                    <p >{authUser ? "Driver Phone: " : "Customer"} {authUser && selectedRide.driverId.phoneNo}</p>
                                    <p >{authUser && selectedRide.vehicleRC} {authUser && selectedRide.vehicleDescription}</p>
                                
                                </div>
                            </div>
                        </div>
                        <div className='py-2 grid grid-cols-3'>
                                <div>
                                    <p className='text-sm'>Rating</p>
                                    <div className="rating gap-0.5 rating-xs">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-yellow-400"
                                            />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" defaultChecked />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-sm'>Payment Method</p>
                                    <p className='text-gray-950 text-xs' >e-Wallet</p>
                                </div>
                                <div>
                                    <p className='text-sm'>Travel Duration</p>
                                    <p className='text-xs text-gray-950'>{(selectedRide.time / 60).toFixed(0)} minutes</p>
                                </div>
                                <div>
                                    <p className='text-sm'>Ride Fare</p>
                                    <p className='text-xs text-gray-950'>₹{selectedRide.fare}</p>
                                </div>
                                <div>
                                    <p className='text-sm'>Discount</p>
                                    <p className='text-xs text-gray-950'>--</p>
                                </div>
                                <div>
                                    <p className='text-sm'>Total Fare</p>
                                    <p className='text-xs text-gray-950'>₹{selectedRide.fare}</p>
                                </div>
                                
                        </div>
                        <div>
                            <p className='text-sm'>Feedback</p>
                            <input type="text" placeholder="Enter your feedback here" className="input input-bordered w-full max-w-xs bg-white p-1 text-sm text-gray-950 text-wrap h-fit" />
                        </div>
                    </div>
                </div>
                
            </div>
        </dialog>
        }
    </div>
  )
}

export default RidesPage
