import React,{useEffect} from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

const ProfilePage = () => {

  const {authUser} = useAuthStore()


  return (
    <div className=" flex items-center justify-center h-[calc(100vh-5rem)]">
    <div className="text-center bg-slate-800 w-full max-w-4xl mx-auto pt-4">
      <div>
        <h2 className=" text-lg md:text-2xl font-bold text-slate-100">Profile</h2>
      </div>
      <div className="text-center mb-4 mt-4">
        
        <form className="space-y-6 w-fit p-6 mx-auto">
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
              className="grow"
              value={authUser.fullName}
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
              className="grow"
              value={authUser.email}
            />
          </label>
          
        </form>
      </div>
    </div>
  </div>
  
  )
}

export default ProfilePage