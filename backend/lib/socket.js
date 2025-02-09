import {Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors : {
        origin : ["http://localhost:5173"]
    }
})

//online drivers
const driverSocketMap = {} //{driverId : socketId}

function getDriverSocketId(driverId) {
    return driverSocketMap[driverId]
}

io.on("connection",(socket) => {
    
  console.log("A driver connected", socket.id);
    const driverId = socket.handshake.query.driverId;
    if(driverId) driverSocketMap[driverId] = socket.id
    //used to send events to all the connected clients
    io.emit("getOnlineDrivers",Object.keys(driverSocketMap))

    socket.on("disconnect",() => {
      console.log("A driver disconnected", socket.id);
      delete driverSocketMap[driverId]
      io.emit("getOnlineDrivers",Object.keys(driverSocketMap))
  })
  ;
})

export {io, app, server,getDriverSocketId}