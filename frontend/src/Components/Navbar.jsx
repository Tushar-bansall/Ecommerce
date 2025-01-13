import { useAuthStore } from "../store/useAuthStore"
import { Link, useLocation } from "react-router-dom"


const navbarbutton = () => {
  const location = useLocation(); // Get current location
  const currentURL = location.pathname; // Get the current path

  return (
    <div className=" bg-transparent">
      {currentURL === '/settings' ? (
        // If the current URL is /settings, show the Login button
        <Link to="/login" className="btn btn-md  rounded-xl" style={{backgroundColor: "#00B5FF"}}>
          <svg
            fill="#000000"
            className="md:h-5 md:w-5"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 481.5 481.5"
            xmlSpace="preserve"
          >
            <path d="M0,240.7c0,7.5,6,13.5,13.5,13.5h326.1l-69.9,69.9c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l93-93 c5.3-5.3,5.3-13.8,0-19.1l-93-93c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l69.9,69.9h-326C6,227.2,0,233.2,0,240.7z"></path>
            <path d="M382.4,0H99C44.4,0,0,44.4,0,99v58.2c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V99c0-39.7,32.3-72,72-72h283.5 c39.7,0,72,32.3,72,72v283.5c0,39.7-32.3,72-72,72H99c-39.7,0-72-32.3-72-72V325c0-7.5-6-13.5-13.5-13.5S0,317.5,0,325v57.5 c0,54.6,44.4,99,99,99h283.5c54.6,0,99-44.4,99-99V99C481.4,44.4,437,0,382.4,0z"></path>
          </svg>
          <span className="inline text-zinc-900">Login</span>
        </Link>
      ) : (
        // Otherwise, show the Settings button
        <Link to="/settings" className="btn btn-md sm:gap-2 transition-colors rounded-xl">
          <svg
            fill="#ffffff"
            className="md:h-5 md:w-5"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 54.00 54.00"
            xmlSpace="preserve"
            stroke="#ffffff"
            strokeWidth="0.00054"
          >
            <path d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571 c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571 c-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78 C22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571 c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571 c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052 c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966 c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42 c0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052 c0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553 c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114 S45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22 C52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571 c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854 c-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052 c0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572 c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294 C10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052 c1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553 c0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78 C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64 c1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104 l-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z"></path>
            <path d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7 s7,3.141,7,7S30.859,34,27,34z"></path>
          </svg>
          <span className="inline">Settings</span>
        </Link>
      )}
    </div>
  );
};


const Navbar = () => {
  const {logout, authUser} = useAuthStore()
  const location = useLocation(); // Get current location
  const currentURL = location.pathname; // Get the current path

  return (
      <div className="navbar hidden md:flex bg-gray-800 gap-5">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost btn-md text-xl"><img src="logo.png" className='w-15 h-10 '/></Link>
        </div>
        {authUser && 
          <div>
          <button className="btn btn-xs sm:btn-md btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs indicator-item badge-info">3</span>
            </div>
          </button>
          <Link to={"/users"} className="btn btn-ghost btn-circle btn-md " >
            <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path fill="#10A64A" d="M256 0c141.387 0 256 114.614 256 256 0 141.387-114.613 256-256 256C114.614 512 0 397.387 0 256 0 114.614 114.614 0 256 0zm122.257 255.999v.004c0 12.532-10.321 22.794-22.79 22.794h-76.671v79.628c0 12.531-10.266 22.79-22.794 22.79h-.004c-12.531 0-22.793-10.324-22.793-22.79v-79.628h-76.668c-12.469 0-22.794-10.316-22.794-22.794v-.004c0-12.478 10.257-22.793 22.794-22.793h76.668V153.58c0-12.466 10.319-22.793 22.793-22.793h.004c12.475 0 22.794 10.258 22.794 22.793v79.626h76.671c12.533 0 22.79 10.267 22.79 22.793z"/></svg>        
          </Link>
          </div>
        }
          <form class=" max-w-[calc(60vw)] ">   
              <div class="relative">
                  <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:ps-10 p-0.5 sm:p-1.5 md:p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for friends" />                  
              </div>
          </form>
          

          
            {authUser ?
              <div className="dropdown dropdown-end  mr-3">
                
                <div tabIndex={0} role="button" className="btn btn-md btn-circle avatar btn-ghost">
                  <div className=" rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={authUser.profilePicture || "user.png"}
                      />
                  </div>
                </div>
                
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-44 sm:w-52 p-2 shadow">
                  <li>{ currentURL === "/profile" ?
                    <Link to={"/"} className="justify-between">
                      Home
                      <span className="badge">New</span>
                    </Link>
                    :
                    <Link to={"/profile"} className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  }
                  </li>
                  <li>
                  { currentURL === "/settings" ?
                    <Link to={"/"} className="justify-between">
                      Home
                    </Link>
                    :
                    <Link to={"/settings"} className="justify-between">
                      Settings
                    </Link>
                  }
                  </li>
                  <li><span onClick={logout}>Logout</span></li>
                </ul>
              </div>
            :
              navbarbutton()
            }
      </div>
  )
}

export default Navbar