import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import styles from "../styles/chat.scss";
// import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData);
      console.log("user has joined message sent", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const messageBox = (messageContent) => (
    <Box>
      <Flex>
        <SunIcon />
        <Flex>
          <Text>{messageContent.message}</Text>
          <Text>{messageContent.author}</Text>
        </Flex>
      </Flex>
    </Box>
  );

  useEffect(() => {
    socket.on("recieveMessage", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div></div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <Flex>
                <Flex direction={"column"}>
                  <Box sx={"boder: 1px solid black"}>
                    <Text className="message-content">
                      {messageContent.author}
                    </Text>
                    <Text id="author">{messageContent.message}</Text>
                    <Text id="time">{messageContent.time}</Text>
                  </Box>
                </Flex>
              </Flex>
            </div>
          );
        })}
        <div style={{width: '20vw'}}>
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            Open
          </Button>
          <Drawer
            id="drawer-111"
            sx={{ width: "20vw" }}
            w="20vw"
            onClose={onClose}
            isOpen={isOpen}
            size={"md"}
            placement="left"
          >
            {/* <DrawerOverlay  w='20vw' /> */}
            <DrawerContent id="drawer-content" sx={"width: 20vw"}>
              <DrawerCloseButton  w='20vw' />
              <DrawerHeader w='20vw'>{`sm drawer contents`}</DrawerHeader>
              <DrawerBody  w='20vw'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Consequat nisl vel pretium lectus quam id. Semper quis lectus
                  nulla at volutpat diam ut venenatis. Dolor morbi non arcu
                  risus quis varius quam quisque. Massa ultricies mi quis
                  hendrerit dolor magna eget est lorem. Erat imperdiet sed
                  euismod nisi porta. Lectus vestibulum mattis ullamcorper
                  velit.
                </p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>

      {/* chat drawer
      <Drawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
          isFullHeight={true}
          size="md"
          placement="right"
        >
          <DrawerContent>
            <DrawerHeader>Stream4Free Live Chat</DrawerHeader>
            <DrawerBody>
              <Input
                type="text"
                value={currentMessage}
                placeholder="Hey..."
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                  onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={onClose}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer> */}
    </div>
  );
}

export default Chat;

// import React, { useEffect, useState } from "react";

// export default function Chat({ socket, username, room }) {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   const sendMessage = async () => {
//     if(currentMessage !== ""){
//       const messageObj = {
//         room: room,
//         author: username,
//         message: currentMessage,
//         time: new Date(Date.now()).getHours() +
//         ":" +
//         new Date(Date.now()).getMinutes(), // get current date and get hours
//       }

//       console.log("chat message: ", messageObj);
//       await socket.emit('sendMessage', messageObj);
//       console.log(username + " message sent!");
//       setCurrentMessage("");
//     }
//   }

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       // setMessageList((list) => [...list, data]);
//       console.log("recieved: " + data);
//     });
//   }, [socket]);

//   // useEffect(() => {
//   //   console.log("use effect hook");
//   //   socket.on("recieveMessage", (data) => {
//   //     console.log("recieved message" + JSON.stringify(data));
//   //   })
//   // }, [socket])

//   // console.log("room: " + room + " author: " + username);
//   return (
//     <div>
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body">

//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           placeholder="start typing here..."
//           onChange={(e) => setCurrentMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>send</button>
//       </div>
//     </div>
//   )
// }
