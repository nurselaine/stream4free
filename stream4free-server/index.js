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
    origin: 'http://localhost:3000'
  }
});

let chatroom = '';
let users = [];

io.on('connection', (socket) => {
  console.log("a user has connected", socket.id);

  // save new users to user list 
  chatroom = room;

  socket.on('login', ({name, room}, callback) => {
    socket.join(room); // join user to room

    // notify room new user has joined
    let timestamp = Date.now();
    socket.to(room).emit('recieveMessage', {
      message: `${username} has joined the room!`,
      username: name,
      timestamp,
    })

  });

  socket.on('sendMessage', message => {
    
  });

  socket.on('disconnect', () => {

  });

  socket.on('disconnect', ({name, room}, callback) => {
      console.log('user disconnected', socket.id);
      let timestamp = Date.now();
      socket.to(room).emit('recieveMessage', {
      message: `${username} has left the room!`,
      username: name,
      timestamp,
    })
    })
})

app.get('/', (req, res) => {
  req.send('Server is up and running');
})
// direct http-server to listen to port 3002
http.listen(PORT, () => {console.log(`Listening on Port ${PORT}`)});