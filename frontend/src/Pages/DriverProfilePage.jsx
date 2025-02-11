import React, { useState } from 'react'
import { useDriverAuthStore } from '../store/driverauthStore'
import toast from 'react-hot-toast'

const DriverProfilePage = () => {

  const {authDriver,isUpdatingProfile,updateProfile} = useDriverAuthStore()
  const [vehicleType,setvehicleType] = useState(authDriver.vehicleType)
  const [vehicleRC,setvehicleRC] = useState(authDriver.vehicleRC)
  const [vehicleDescription,setvehicleDescription] = useState(authDriver.vehicleDescription)

  const verifyDetails = () =>{
    if(!vehicleType || !vehicleRC || !vehicleDescription)
    {
      toast.error("All fields are required")
      return false
    }
    else {
      const rcPattern = /^[A-Z]{2} \d{2} [A-Z]{2} \d{4}$/;
    
      if(!rcPattern.test(vehicleRC))
      {
        toast.error("Enter valid Vehicle RC number")
        return false
      }
    }
    return true
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(verifyDetails())
    {
      updateProfile({
        vehicleType,
        vehicleRC,
        vehicleDescription
      })
    }
  }

  return (
    <div className="flex text-center justify-center bg-slate-800 w-full max-w-4xl mx-auto pt-4">
      
        <h2 className=" text-lg md:text-2xl font-bold text-slate-100">Profile</h2>
      
      <div className="text-center mb-4 mt-6">
        
        <form onSubmit={handleSubmit} className="space-y-6 w-fit p-6 mx-auto">
          <label className="input input-bordered flex items-center gap-1">
            <span className="label-text font-medium text-nowrap text-slate-100">Full Name</span>
  
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              disabled
              type="text"
              className="grow ml-2"
              value={authDriver.fullName}
            />
          </label>
          <label className="input input-bordered flex items-center gap-1">
            <span className="label-text font-medium text-slate-100">Email</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            <input
              disabled
              type="email"
              className="grow ml-2"
              value={authDriver.email}
            />
          </label>
          <label className="input input-bordered flex items-center gap-1">
            <span className="label-text font-medium text-slate-100">Phone Number</span>
            <svg 
              fill="currentColor"
              className="h-3 w-3 opacity-70" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 891.024 891.024" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M2.8,180.875c46.6,134,144.7,286.2,282.9,424.399c138.2,138.2,290.4,236.301,424.4,282.9c18.2,6.3,38.3,1.8,52-11.8 l92.7-92.7l21.6-21.6c19.5-19.5,19.5-51.2,0-70.7l-143.5-143.4c-19.5-19.5-51.2-19.5-70.7,0l-38.899,38.9 c-20.2,20.2-52.4,22.2-75,4.6c-44.7-34.8-89-73.899-131.9-116.8c-42.9-42.9-82-87.2-116.8-131.9c-17.601-22.6-15.601-54.7,4.6-75 l38.9-38.9c19.5-19.5,19.5-51.2,0-70.7l-143.5-143.5c-19.5-19.5-51.2-19.5-70.7,0l-21.6,21.6l-92.7,92.7 C1,142.575-3.5,162.675,2.8,180.875z"></path> </g> </g></svg><input
              disabled
              type="email"
              className="grow ml-2"
              value={authDriver.phoneNo}
            />
          </label>
          <label className="input input-bordered flex items-center gap-1">
            <span className="label-text font-medium text-slate-100">License</span>
            <svg fill="currentColor" className="h-5 w-5 opacity-70" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> fill:#000000; </style> <g> <path class="st0" d="M464.932,85.797H47.068C21.076,85.797,0,106.865,0,132.865v246.271c0,25.991,21.076,47.067,47.068,47.067 h417.865c25.991,0,47.068-21.076,47.068-47.067V132.865C512,106.865,490.924,85.797,464.932,85.797z M123.254,167.399 c25.966,0,47.026,21.059,47.026,47.034c0,25.974-21.06,47.025-47.026,47.025c-25.974,0-47.025-21.051-47.025-47.025 C76.229,188.458,97.28,167.399,123.254,167.399z M123.254,348.916c-32.305,0-65.389-11.187-60.229-42.153 c2.102-12.576,12.508-30.203,20.407-38.102c1.016-1.017,5.652-1.28,6.915-0.5c9.585,5.907,20.839,9.364,32.907,9.364 c12.068,0,23.313-3.457,32.898-9.364c1.263-0.78,5.898-0.517,6.924,0.5c7.89,7.899,18.296,25.526,20.398,38.102 C188.636,337.729,155.551,348.916,123.254,348.916z M366.424,333.492H232.194v-27h134.229V333.492z M446.686,267.068H232.194v-27 h214.492V267.068z M446.686,200.644H232.194v-27h214.492V200.644z"></path> </g> </g></svg>
            <input
              type="text"
              className="grow ml-2"
            />
          </label>
          <label className="input input-bordered flex items-center gap-4">
            <span className="label-text font-medium text-slate-100">Vehicle Type</span>
            
            <select onChange={(e)=>{
              setvehicleType(e.target.value)
            }} value={vehicleType} className="select w-fit select-sm">
              <option value="Bike">Bike</option>
              <option value="Auto">Auto</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
            </select>
          </label>
          <label className="input input-bordered flex items-center gap-1">
            <span className="label-text font-medium text-slate-100">Vehicle RC</span>
            <svg fill="currentColor" className="h-7 w-6 opacity-70" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M460.688,164.532H51.312C23.019,164.532,0,187.55,0,215.843v80.314c0,28.293,23.019,51.312,51.312,51.312h409.377 c28.293,0,51.312-23.019,51.312-51.312v-80.314C512,187.55,488.981,164.532,460.688,164.532z M478.536,296.157 c0,9.841-8.007,17.847-17.848,17.847H51.312c-9.841,0-17.847-8.007-17.847-17.847v-80.314c0-9.841,8.007-17.847,17.847-17.847 h409.377c9.841,0,17.848,8.007,17.848,17.847V296.157z"></path> </g> </g> <g> <g> <path d="M115.406,283.852L96.54,254.735l18.103-29.008c0.764-1.199,1.091-2.29,1.091-3.381c0-4.579-6.215-8.069-11.014-8.069 c-2.398,0-4.035,0.872-5.126,2.836L85.09,242.414l-14.503-25.301c-1.091-1.963-2.726-2.836-5.126-2.836 c-4.799,0-11.014,3.49-11.014,8.069c0,1.092,0.327,2.182,1.091,3.381l18.103,29.008l-18.866,29.117 c-0.655,1.091-0.982,2.071-0.982,3.053c0,4.689,6.653,8.397,11.341,8.397c1.745,0,3.273-0.545,4.035-1.745l15.921-27.044 l15.921,27.044c0.655,1.199,2.291,1.745,4.035,1.745c4.689,0,11.342-3.708,11.342-8.397 C116.388,285.924,116.06,284.942,115.406,283.852z"></path> </g> </g> <g> <g> <path d="M169.493,214.932c-2.725,0-3.816,1.091-4.907,3.162l-15.158,28.026l-15.267-28.026c-1.199-2.071-2.181-3.162-4.907-3.162 c-4.689,0-11.56,2.945-11.56,6.979c0,0.327,0,0.764,0.219,1.199l22.573,37.405c0.219,0.327,0.437,0.872,0.437,1.526v27.372 c0,3.489,4.253,5.234,8.505,5.234c4.253,0,8.507-1.745,8.507-5.234v-27.372c0-0.654,0.218-1.199,0.436-1.526l22.466-37.405 c0.218-0.436,0.218-0.872,0.218-1.199C181.054,217.876,174.183,214.932,169.493,214.932z"></path> </g> </g> <g> <g> <path d="M233.942,279.818h-29.662l30.752-54.416c1.199-2.182,1.853-4.253,1.853-5.998c0-2.618-1.635-4.472-4.906-4.472h-42.094 c-3.599,0-5.126,3.817-5.126,7.415c0,3.926,1.854,7.416,5.126,7.416h25.301l-30.752,54.416c-1.199,2.073-1.854,4.253-1.854,5.999 c0,2.617,1.418,4.471,4.907,4.471h46.456c3.272,0,5.126-3.926,5.126-7.415C239.066,283.743,237.212,279.818,233.942,279.818z"></path> </g> </g> <g> <g> <path d="M311.445,214.932c-15.049,0-26.718,6.979-26.718,25.736v28.898c0,18.757,11.669,25.736,26.718,25.736 c15.049,0,26.827-6.979,26.827-25.736v-28.898C338.273,221.91,326.494,214.932,311.445,214.932z M321.26,269.566 c0,7.524-3.708,10.905-9.815,10.905c-6.107,0-9.706-3.381-9.706-10.905v-28.898c0-7.525,3.6-10.905,9.706-10.905 s9.815,3.38,9.815,10.905V269.566z"></path> </g> </g> <g> <g> <path d="M373.492,214.932c-15.049,0-26.718,6.979-26.718,25.736v28.898c0,18.757,11.669,25.736,26.718,25.736 s26.827-6.979,26.827-25.736v-28.898C400.319,221.91,388.541,214.932,373.492,214.932z M383.307,269.566 c0,7.524-3.708,10.905-9.815,10.905c-6.107,0-9.706-3.381-9.706-10.905v-28.898c0-7.525,3.6-10.905,9.706-10.905 s9.815,3.38,9.815,10.905V269.566z"></path> </g> </g> <g> <g> <path d="M435.539,214.932c-15.049,0-26.718,6.979-26.718,25.736v28.898c0,18.757,11.669,25.736,26.718,25.736 c15.049,0,26.827-6.979,26.827-25.736v-28.898C462.366,221.91,450.588,214.932,435.539,214.932z M445.354,269.566 c0,7.524-3.708,10.905-9.815,10.905s-9.706-3.381-9.706-10.905v-28.898c0-7.525,3.6-10.905,9.706-10.905s9.815,3.38,9.815,10.905 V269.566z"></path> </g> </g> </g></svg>
            <input
              type="text"
              className="grow ml-2"
              onChange={(e)=>{
              setvehicleRC(e.target.value)
              }} 
              placeholder='XX 12 YY 1234'
              value={vehicleRC} 
            />
          </label>
          <label className="input input-bordered flex items-center gap-1">
            <span className="label-text font-medium text-slate-100">Vehicle Description</span>
            
            <input
              type="text"
              onChange={(e)=>{
              setvehicleDescription(e.target.value)
              }} 
              value={vehicleDescription} 
              placeholder='Vehicle Make Model Colour'
              className="grow ml-2"
            />
          </label>
          
          
        { !isUpdatingProfile ? <button type='submit' className="btn btn-sm sm:btn-md btn-outline btn-info w-full md:w-[calc(28vw)] text-base" >Update Profile</button>
            : <button className="btn w-full"><span className="loading loading-spinner"></span>Updating</button>}
        </form>
      </div>
    </div>
  
  )
}

export default DriverProfilePage