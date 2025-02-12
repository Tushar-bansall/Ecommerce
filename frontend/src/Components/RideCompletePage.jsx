import React,{useEffect} from 'react'
import { useRideStore } from '../store/rideauthStore'
import {format} from 'date-fns'
import { Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const RideCompletePage = (props) => {
    const {rides,getRides} = useRideStore()
    
    useEffect(()=>{
        getRides()
    },[rides,getRides])
    const ride = rides[rides.length - 1 ]
    const date= new Date()
    

  const formattedDate = format(date, 'eeee, dd MMMM yyyy');
  const vehicleUrl = (ride?.vehicle==="Bike" || ride?.vehicle==="Auto") ? "vehicle.png" : "vehicle.svg"
  
  return (
    <div className=' grid md:grid-cols-2  h-[calc(100vh-5rem)]'>
        <div className='flex-col bg-white w-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100'>
            <div className='flex w-full justify-between p-4'>
                <Link to="/">
                    <img className='w-8 h-8 cursor-pointer border-zinc-200 border-2 rounded-2xl' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC3ElEQVR4nNWaS0sbURSAoy3aumiLglU3WRST7uvGPxADSYl9LCQLW2j3+S19CUIXgqBNHzTYRJrGle6srQt/QFbZBUJKaioBv3JkQsd08rp3nh8MJCS5936ZO3fOuWdCIYcAZoEIcM845PVsyM8At4BHwGvgO/CL7tSN77wCHspvvR78CBAHPgB/UKcJZIEladNtCfknj7Gfn8CyGwIyz0s4TxGYd0piFWjgHqdAxk6Bq8BbvGNdxqArcR3YwXtywDVViSvAJ/zDF6Uz4/F06sb6sBLP8C9PhllifzsxgvPzczY2NshkMmxtbV28V6Ax0NIM7NqvAM1mk0QigXTRPtLptGpz3wa5YzsiEY/HL0m0j4ODA9VmU71EjtyUkEOmmiLHlrGZEQC6KjExMUG5XNbpYslKRKJY1yRGR0fZ3NzU7eadVT6hE4pf4uzsjGQy2VNCY0p1pgA3zSKPCZ5Em39hP/CGYEoIL80iknoGUUI4NItIHh1ECaHelrhNcCXaTIvIXTRYWVnxWkKIiMgCipycnPhBQljQEimVSl1FotEo9brWpTe0SBRFarUaU1NTXWUWFxfdkoloX+z5fJ6xsTGvZaZtWX4LhQLj4+NeydRtvSF6KHNoFpHNZwIq88IsIjvpBFQm1RnGS0gcNJlT4EZnTvIeG3FJZtsqQ5T6hK3kcrmeS3MsFlPdEmoT+0/Eqc2HfjJ7e3s6tZSRbiLLOEAvmWxWilVK3LeUMMkUcElmcnKSarWq0lyxp4QhMu9UQadYLDI3N3chEQ6H2d/fV2mmAdzpK2LIPMUhWq0WlUpF5yJfHUjCJCOVIr+xNpSEqdDzEf+wo1yCk3KXUfbyms/KpbeOM+PlNFuTMWhJ+KA8/dw2AYul+asLErsDL7GaQinghwMCR33v2A4JSaCZ1UwBZAptdw0A3US29oEHxqNLkjb3is/ls0PZfDZiu8v5RMhnADMWD57NONXhX9IMX5qaTke5AAAAAElFTkSuQmCC" alt="back--v1"></img>
                </Link>
                <p className='text-gray-950 font-semibold'>You've arrived</p>
                <svg viewBox="-7.44 -7.44 38.88 38.88" className='w-8 h-8 cursor-pointer border-zinc-200 border-2 rounded-2xl p-1' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-7.44" y="-7.44" width="38.88" height="38.88" rx="19.44" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.554 3.9974L19.2301 8.13188C21.0767 9.76455 22 10.5809 22 11.6325C22 12.6842 21.0767 13.5005 19.2301 15.1332L14.554 19.2677C13.7111 20.0129 13.2897 20.3856 12.9422 20.2303C12.5947 20.0751 12.5947 19.5143 12.5947 18.3925V15.6472C8.35683 15.6472 3.76579 17.6545 2 21C2 10.2943 8.27835 7.61792 12.5947 7.61792V4.87257C12.5947 3.75082 12.5947 3.18995 12.9422 3.03474C13.2897 2.87953 13.7111 3.25215 14.554 3.9974Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <div className='p-4 w-full flex bg-radial-gradient from-blue-500 via-blue-600 to-blue-700 justify-between' >
                <div className='flex mr-6 text-white gap-1 items-center '>
                    <p>Make sure your belongings are not left behind</p>
                    <img width="20" height="20" src="https://img.icons8.com/emoji/48/eyes-emoji.png" alt="eyes-emoji"/>
                </div>
                <svg viewBox="0 -0.5 25 25" className='w-6 h-6' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#ffffff"></path> </g></svg>
            </div>
            <div className='flex items-center justify-center pt-4 pb-2'>
                <img className='w-12 h-14' src={vehicleUrl} />
                   
                <div className="avatar">
                    <div className="w-10 rounded-full border-2 border-zinc-200">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>
            <p className=' text-lg font-bold text-center items-center text-gray-950'>{ride?.driverId.fullName}</p>
            <div className='flex justify-center '>
                <p className='text-xs font-normal text-gray-950'>{ride?.driverId.vehicleRC}</p>
                <svg className='w-3 h-3 my-auto' viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12.5" cy="12.5" r="1.5" fill="#121923" stroke="#121923" stroke-width="1.2"></circle> </g></svg>
                <p className='text-xs font-normal text-gray-950'>{ride?.driverId.vehicleDescription}</p>    
            </div>
            <div className='w-full flex justify-between px-4 py-1'>
                <p className='text-xs text-gray-950 font-semibold'>Trip Completed</p>
                <div className='flex gap-1.5'>
                    <p className='text-xs '>{ride?._id}</p>
                    <svg className='w-2 h-2 my-auto cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="#5172e1" stroke-width="1.5"></path> <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="#5172e1" stroke-width="1.5"></path> </g></svg>
                </div>  
            </div>
            <div className='w-full flex justify-between px-4 py-1'>
                <p className='text-xs text-gray-950 font-semibold'>Date</p>
                <p className='text-xs'>{formattedDate}</p>
            </div>
            <div className='divider mb-1'></div>
            <div className=' text-gray-950 font-semibold text-center items-center'>How was your trip?</div>
            <div className=' text-gray-950 text-sm font-medium text-center items-center'>(Give 1 to five stars about your trip)</div>
            
            <div className="rating gap-2 rating-md flex justify-center p-3">
                <input type="radio" name="rating-2" className="mask mask-star-2 checked:bg-yellow-400 " />
                <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 checked:bg-yellow-400 "
                    />
                <input type="radio" name="rating-2" className="mask mask-star-2 checked:bg-yellow-400 " />
                <input type="radio" name="rating-2" className="mask mask-star-2 checked:bg-yellow-400 " />
                <input type="radio" name="rating-2" className="mask mask-star-2 checked:bg-yellow-400 " />
            </div>
            
            <div className='divider m-0'></div>
            <div className='m-4 border-2 border-zinc-200 rounded-2xl bg-slate-50 p-4 flex flex-col gap-2'>
                <p className='text-xs text-gray-950 font-medium'>Trip Details</p>
                <div className='flex justify-between'>
                    <p className='text-xs text-gray-950 font-medium'>Pickup Location</p>
                    <p className='text-xs font-medium'>{ride?.pickup}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-xs text-gray-950 font-medium'>Destination</p>
                    <p className='text-xs font-medium'>{ride?.destination}</p>
                </div>
                <div className='divider m-0'></div>
                <div className='flex justify-between'>
                    <p className='text-xs text-gray-950 font-medium'>Payment Method</p>
                    <p className='text-xs font-medium'>{props.paid ? "e-Payment" : "Pay Cash to the driver"}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-xs text-gray-950 font-medium'>Fare</p>
                    <p className='text-xs font-medium'>₹ {ride?.fare}</p>
                </div>
                <div className='divider m-0'></div>
                <div className='flex justify-between'>
                    <p className='text-xs text-gray-950 font-medium'>Customer Name</p>
                    <p className='text-xs font-medium'>{ride?.userId.fullName}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-xs text-gray-950 font-medium'>Driver Name</p>
                    <p className='text-xs font-medium'>{ride?.driverId.fullName}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-xs text-gray-950 font-medium'>Driver Phone Number</p>
                    <p className='text-xs font-medium'>{ride?.driverId.phoneNo}</p>
                </div>
            </div>

        </div>
        <DotLottieReact
      src="https://lottie.host/879c4d16-0d2d-425c-8cc1-ab96ba8d370f/kO29bxnldN.lottie"
      loop
      autoplay
    />
    </div>
  )
}

export default RideCompletePage