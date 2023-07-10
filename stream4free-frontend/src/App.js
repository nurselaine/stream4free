import React, { useEffect, useState } from "react";
import "./App.css";
import { ChakraProvider, Show } from "@chakra-ui/react";
import io, { Socket } from "socket.io-client";

import Chat from "./components/Chat";
import Video from "./components/video";
import Navbar from "./components/nav";
import StreamingServices from "./components/services";
import Login from "./pages/login";

function App() {
  let socket = io.connect("http://localhost:3002");

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const handleUsername = (newUser) => {
    setUsername(newUser);
  };

  const handleRoom = (newRoom) => {
    setRoom(newRoom);
  };

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log(username + " " + room);
      let data = { username, room };
      socket.emit("login", data);
      setJoined(true);
    }
  };

  useEffect(() => {
    socket.on("recieveMessage", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <ChakraProvider>
      <div className="App">
        {!joined &&
            <Login
              handleUsername={handleUsername}
              handleRoom={handleRoom}
              joinRoom={joinRoom}
            />
          }
        {joined &&
          <>
          <Navbar socket={socket} username={username} room={room} />
          <Video />
          <StreamingServices />
          </>
        }
      </div>
    </ChakraProvider>
  );
}

export default App;
