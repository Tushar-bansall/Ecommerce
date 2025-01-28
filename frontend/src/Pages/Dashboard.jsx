import React from 'react'

const Dashboard = () => {
  return (
    <div>
    <div class="fixed left-0 top-18 w-64 h-full bg-[#f8f4f3] p-4 sidebar-menu transition-transform">
        
        <ul class="mt-4">
            <span class="text-gray-400 font-bold">ADMIN</span>
            <li class="mb-1 group">
                <a href="/dashboard" class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    
                    <span class="text-sm">Dashboard</span>
                </a>
            </li>
            <li class="mb-1 group">
                <p class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                                   
                    <span class="text-sm">Cabs</span>
                </p>
            </li>
            <li class="mb-1 group">
                <a href="/rides" class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                   
                    <span class="text-sm">Rides</span>
                </a>
            </li>
            <span class="text-gray-400 font-bold">PERSONAL</span>
            <li class="mb-1 group">
                <a href="/driverprofile" class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                   
                    <span class="text-sm">Profile</span>
                 </a>
            </li>
            <li class="mb-1 group">
                <p class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                    
                    <span class="text-sm">Notifications</span>
                    <span class=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">5</span>
                </p>
            </li>
            <li class="mb-1 group">
                <p class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                   
                    <span class="text-sm">Messages</span>
                    <span class=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">2 New</span>
                </p>
            </li>
            <span class="text-gray-400 font-bold">TERMS AND CONDITIONS</span>
            <li class="mb-1 group">
                <p class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                   
                    <span class="text-sm">Terms</span>
                   </p>
            </li>
            <li class="mb-1 group">
                <p  class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                                   
                    <span class="text-sm">Customer Care</span>
                  </p>
            </li>
        </ul>
    </div>
    <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    

    <div class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
        
              
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                    <div class="flex justify-between mb-6">
                        <div>
                            <div class="flex items-center mb-1">
                                <div class="text-2xl font-semibold">2</div>
                            </div>
                            <div class="text-sm font-medium text-gray-400">Cabs</div>
                        </div>
                    </div>

                    <p class="text-[#f84525] font-medium text-sm hover:text-red-800">View</p>
                </div>
                <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                    <div class="flex justify-between mb-4">
                        <div>
                            <div class="flex items-center mb-1">
                                <div class="text-2xl font-semibold">100</div>
                                <div class="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">+30%</div>
                            </div>
                            <div class="text-sm font-medium text-gray-400">Rides</div>
                        </div>
                    </div>
                    <a href="/rides" class="text-[#f84525] font-medium text-sm hover:text-red-800">View</a>
                </div>
                <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                    <div class="flex justify-between mb-6">
                        <div>
                            <div class="text-2xl font-semibold mb-1">100</div>
                            <div class="text-sm font-medium text-gray-400">Repairs</div>
                        </div>
                    </div>
                    <p class="text-[#f84525] font-medium text-sm hover:text-red-800">View</p>
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                    <div class="rounded-t mb-0 px-0 border-0">
                      <div class="flex flex-wrap items-center px-4 py-2">
                        <div class="relative w-full max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50">Cabs</h3>
                        </div>
                      </div>
                      <div class="block w-full overflow-x-auto">
                        <table class="items-center w-full bg-transparent border-collapse">
                          <thead>
                            <tr>
                              <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Cab</th>
                              <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Amount</th>
                              <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="text-gray-700 dark:text-gray-100">
                              <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Bike</th>
                              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">1</td>
                              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div class="flex items-center">
                                  <span class="mr-2">70%</span>
                                  <div class="relative w-full">
                                    <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                      <div style={{width: "70%"}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr class="text-gray-700 dark:text-gray-100">
                              <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Auto</th>
                              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">6</td>
                              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div class="flex items-center">
                                  <span class="mr-2">40%</span>
                                  <div class="relative w-full">
                                    <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                      <div style={{width: "40%"}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr class="text-gray-700 dark:text-gray-100">
                              <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Hatchback</th>
                              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">5</td>
                              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div class="flex items-center">
                                  <span class="mr-2">45%</span>
                                  <div class="relative w-full">
                                    <div class="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                                      <div style={{width: "45%"}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr class="text-gray-700 dark:text-gray-100">
                              <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Sedan</th>
                              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">4</td>
                              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div class="flex items-center">
                                  <span class="mr-2">60%</span>
                                  <div class="relative w-full">
                                    <div class="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                      <div style={{width: "60%"}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                        <div class="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div class="flex justify-between mb-4 items-start">
                        <div class="font-medium">Rides</div>
                        
                    </div>
                    <div class="overflow-hidden">
                        <table class="w-full">
                            <tbody>
                                <tr>
                                <td class="py-2 px-4 border-b border-b-gray-50">
                                        <div class="flex items-center">
                                            <a href="#" class="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Ride 1</a>
                                        </div>
                                    </td>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <span class="text-[13px] font-medium text-gray-400">02-02-2024</span>
                                    </td>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <span class="text-[13px] font-medium text-gray-400">Fare</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <div class="flex items-center">
                                            <a href="#" class="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Ride 1</a>
                                        </div>
                                    </td>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <span class="text-[13px] font-medium text-gray-400">02-02-2024</span>
                                    </td>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <span class="text-[13px] font-medium text-gray-400">Fare</span>
                                    </td>
                                     
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                    <div class="flex justify-between mb-4 items-start">
                        <div class="font-medium">Rides Statistics</div>
                         
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div class="rounded-md border border-dashed border-gray-200 p-4">
                            <div class="flex items-center mb-0.5">
                                <div class="text-xl font-semibold">10</div>
                                <span class="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">$80</span>
                            </div>
                            <span class="text-gray-400 text-sm">Active</span>
                        </div>
                        <div class="rounded-md border border-dashed border-gray-200 p-4">
                            <div class="flex items-center mb-0.5">
                                <div class="text-xl font-semibold">50</div>
                                <span class="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">+$469</span>
                            </div>
                            <span class="text-gray-400 text-sm">Completed</span>
                        </div>
                        <div class="rounded-md border border-dashed border-gray-200 p-4">
                            <div class="flex items-center mb-0.5">
                                <div class="text-xl font-semibold">4</div>
                                <span class="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">-$130</span>
                            </div>
                            <span class="text-gray-400 text-sm">Canceled</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div class="flex justify-between mb-4 items-start">
                        <div class="font-medium">Earnings</div>
                        
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-[460px]">
                            <thead>
                                <tr>
                                    <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                    <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Earning</th>
                                    <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                
                                <tr>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <div class="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover block">
                                            </img><a href="#" class="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Damages</a>
                                        </div>
                                    </td>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <span class="text-[13px] font-medium text-rose-500">-$235</span>
                                    </td>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <span class="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <div class="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover block">
                                            </img><a href="#" class="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Rides Completed</a>
                                        </div>
                                    </td>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <span class="text-[13px] font-medium text-emerald-500">+$235</span>
                                    </td>
                                    <td class="py-2 px-4 border-b border-b-gray-50">
                                        <span class="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dashboard