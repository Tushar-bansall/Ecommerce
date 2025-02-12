import { useAuthStore } from "../store/useAuthStore"
import { useDriverAuthStore } from "../store/driverauthStore"
import {Link,useLocation} from "react-router-dom"
import { useState } from "react";



const Navbar = () => {
  
  const location = useLocation(); // Get current location
  const currentURL = location.pathname; // Get the current path
  const {authUser,logout} = useAuthStore()
  const {authDriver,Driverlogout,connectSocket,disconnectSocket}= useDriverAuthStore()
  const [open,setOpen] = useState(false)
  const [online,setOnline] = useState(false)
  
  const handleOnline = (e) =>{
    if(!online)
    {
      connectSocket()
      setOnline(true)
    } else {
      disconnectSocket()
      setOnline(false)
    }
  }

  return (
    <>
    <div className="navbar bg-gray-800 px-5 items-center w-full text-white text-2xl justify-between hidden md:flex">
      { (authUser || authDriver) ?
      (currentURL === "/driver" ? (
        <>
        <details onClick={()=>{setOpen(!open)}} className="dropdown">
          <summary className="btn btn-ghost btn-sm btn-circle">
          
          {open ? '✖' : '☰' }
     
          </summary>
          <ul className="dropdown-content menu bg-gray-900 rounded-box z-[1] w-fit p-2 shadow">
            <li><a href="/driverprofile">Profile</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/rides">Rides</a></li>
            <li onClick={Driverlogout}><a href="/driverlogin">Logout</a></li>
          </ul>
        </details>
        <Link to="/" className="px-1 btn-ghost rounded-md text-2xl font-semibold">ZappCab</Link>
        
        <label className="flex cursor-pointer gap-4 ">
          <span className="label-text text-white font-semibold">Online</span>
          <input type="checkbox" onChange={handleOnline} className="toggle toggle-info toggle-sm theme-controller " />
        </label>
        </>
      ) :
      (
        <>
      <Link to={authDriver ? "/driver" : "/"} className="mx-2 px-2 btn-ghost rounded-lg">ZappCab</Link>
      <div className="block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          <li><a href={authDriver ? "/driverprofile" : "profile"}>Profile</a></li>
          {authDriver && <li><a href="/dashboard">Dashboard</a></li>}
          <li><a href={authDriver ? "/driver" : "/"}>Home</a></li>
          <li><a href="/rides">Rides</a></li>
          <li onClick={authDriver ? Driverlogout :logout}><a href={authDriver ? "/driverlogin" : "/login"}>Logout</a></li>
        </ul>
      </div>
      </>))
      :
      <Link to={authDriver ? "/driver" : "/"} className="mx-auto text-xl font-semibold px-2 btn-ghost rounded-lg">ZappCab</Link>
      
      }
      
    </div>
    <div className="navbar bg-gray-800 items-center w-[calc(90vw)] mx-auto  flex text-white text-base justify-between rounded-xl md:hidden">
    {
      (authDriver || authUser) ? (
        
        <>
        <details onClick={()=>{setOpen(!open)}} className="dropdown">
          <summary className="btn btn-ghost btn-sm btn-circle">
          
          {open ? '✖' : '☰' }
     
          </summary>
          <ul className="dropdown-content menu bg-gray-900 rounded-box z-[1] w-fit p-2 shadow">
            <li><a href={authDriver ? "/driverprofile" : "/profile"}>Profile</a></li>
            <li><a href={authDriver ? "/driver" : "/"}>Home</a></li>
            {authDriver && <li><a href="/dashboard">Dashboard</a></li>}
            <li><a href="/rides">Rides</a></li>
            <li onClick={authDriver ? Driverlogout : logout}><a href={authDriver ? "/login" : "/login"}>Logout</a></li>
          </ul>
        </details>
        <Link to="/" className="px-1 btn-ghost rounded-md text-2xl font-semibold">ZappCab</Link>
        
        {currentURL === "/driver" && (
          <label className="flex cursor-pointer gap-4 ">
            <span className="label-text text-white font-semibold">Online</span>
            <input type="checkbox" onChange={handleOnline} className="toggle toggle-info toggle-sm theme-controller " />
          </label>
        )}
        </>) :
        (
          
          <Link to={authDriver ? "/driver" : "/"} className="mx-auto text-lg font-semibold px-2 btn-ghost rounded-lg">ZappCab</Link>
      
        )
      }
    
    </div>
    </>
  )
}

export default Navbar