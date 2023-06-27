// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// app.use(cors());

// const server = http.createServer(app);
// const PORT = process.env.PORT || 3002;

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// server.listen(3001, () => {
//   console.log("SERVER RUNNING ON PORT " + PORT);
// });

// initialize express app
const app = require('express')();
// define rout route handler
const http = require('http').createServer(app);
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3002;

app.use(cors());

// initialize socket.io instance 
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

let chatroom = '';
let users = [];

io.on('connection', (socket) => {
  console.log("a user has connected", socket.id);

  // save new users to user list 

  socket.on('login', async (data) => {
    let { username, room } = data;
    socket.join(room); // join user to room
    console.log(`User with ID: ${username} joined room: ${room}`);

  

    // notify room new user has joined
    let timestamp = Date.now();
    await socket.to(room).emit('recieveMessage', {
      message: `${username} has joined the room!`,
      username,
      timestamp,
    })
    console.log("recieved user has joined room message")

  });

  socket.on('sendMessage', messageObj => {
    // const { chatroom, username, message } = messageObj;
    console.log(messageObj);
    // emit the recieved message
    socket.to(messageObj.room).emit("recieveMessage", messageObj);
  });

  socket.on('disconnect', ({username, room}, callback) => {
      console.log('user disconnected', socket.id);
      let timestamp = Date.now();
      socket.to(room).emit('recieveMessage', {
      message: `${username} has left the room!`,
      username,
      timestamp,
    })
    })
})

app.get('/', (req, res) => {
  req.send('Server is up and running');
})
// direct http-server to listen to port 3002
http.listen(PORT, () => {console.log(`Listening on Port ${PORT}`)});