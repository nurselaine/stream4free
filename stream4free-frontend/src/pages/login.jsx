import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import styles from "../styles/login.scss";

export default function Login({ handleUsername, handleRoom, joinRoom }) {
  return (
    <Center h="100vh" w="100vw">
      <Box>
        <Text id="login_header" fontSize='6xl' p={8}>NextFix</Text>
        <Flex direction="column">
          <Box p={4}>
            <Input
              type="text"
              placeholder="John Doe"
              variant={"filled"}
              size="md"
              onChange={(e) => handleUsername(e.target.value)}
            />
          </Box>
          <Box p={4}>
            <Flex>
              <Input
                type="text"
                placeholder="random-room-name"
                variant={"filled"}
                size="md"
                onChange={(e) => handleRoom(e.target.value)}
              />
            </Flex>
          </Box>
        </Flex>
        <Button onClick={joinRoom} size='md' bgColor={'#E47068'} color='white'>Join Room!</Button>
      </Box>
    </Center>
  );
}
