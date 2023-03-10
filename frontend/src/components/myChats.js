import React, { useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";

import ChatLoading from "./chatLoading";
import { Box, Stack, Text, Button } from "@chakra-ui/react";
import { getSender } from "../config.js/chatLogic";
import GroupChatModal from "./groupChatModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatAction, setSelectedChat } from "../store/chatSlice";
import { fetchMessageAction } from "../store/messageSlice";
const MyChats = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { selectedChat, userChats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const clickHandler = (chat) => {
    dispatch(setSelectedChat(chat));
    dispatch(fetchMessageAction());
  };
  useEffect(() => {
    dispatch(fetchChatAction());
  }, []);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      width={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="scroll"
      >
        {userChats ? (
          <Stack overflowY="scroll">
            {userChats.map((chat) => (
              <Box
                onClick={() => clickHandler(chat)}
                cursor="pointer"
                bg={
                  selectedChat && selectedChat._id === chat._id
                    ? "#38B2AC"
                    : "#E8E8E8"
                }
                color={
                  selectedChat && selectedChat._id === chat._id
                    ? "white"
                    : "black"
                }
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(userInfo, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
