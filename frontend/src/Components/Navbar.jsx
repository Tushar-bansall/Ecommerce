import { useAuthStore } from "../store/useAuthStore"
import { useDriverAuthStore } from "../store/driverauthStore"
import {Link} from "react-router-dom"



const Navbar = () => {
  const {logout} = useAuthStore()
  const {authDriver,Driverlogout}= useDriverAuthStore()

  return (
    <div className="navbar bg-gray-800 w-full hidden md:flex text-white text-2xl justify-between">
      <Link to="/" className="mx-2 px-2 btn-ghost rounded-lg">ZappCab</Link>
      <div className="block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          <li><a href={authDriver ? "/driverprofile" : "profile"}>Profile</a></li>
          <li><a href="/rides">Rides</a></li>
          <li onClick={authDriver ? Driverlogout :logout}><a href="/login">Logout</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar