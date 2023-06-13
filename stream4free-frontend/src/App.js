import React, { useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import io, { Socket } from "socket.io-client";

import Chat from "./components/Chat";
import Video from "./components/video";

function App() {
  let socket = io.connect("http://localhost:3002");

  
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log(username + " " + room);
      let data = {username, room};
      socket.emit("login", data);
    }
  };

  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="John"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room-1"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room!</button>
      <Video />
      <Chat 
        socket={socket}
        username={username}
        room={room}
      />
    </div>
  );
}

export default App;
