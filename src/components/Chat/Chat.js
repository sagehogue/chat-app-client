import React, { useState, useEffect } from "react";
// import queryString from "query-string"; // This was used to determine name/room
import io from "socket.io-client";
import styled from "styled-components";

import UserList from "../UI/UserList/UserList";
import TextContainer from "./TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "./InfoBar/InfoBar";
import Input from "../UI/Input/Input";
import Theme from "../../util/Theme/Theme";

import { getCurrentTime, sortByDate } from "../../util/helpers/helpers.js";

// TODOS:

// Create component to display users in room
// Make chat window draggable for users who wanna write textwalls
// Create roomDisconnect event to fire when user clicks X on chat window, thus leaving the chat.

const OuterContainer = styled.div`
  display: flex;
  position: relative;
  grid-row: ${Theme.layout.gridRowChat};
  grid-column: ${Theme.layout.gridColChat};
  justify-content: center;
  align-items: center;
  margin: auto;
  //   @media (min-width: 320px) and (max-width: 480px) {
  //     height: 100%;
  //   }
`;

const Container = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 0.8rem;
  height: 84vh;
  width: 58vw;
  z-index: ${(props) => (props.showUsers ? "0" : Theme.zIndex.chat)};
  //   @media (min-width: 320px) and (max-width: 480px) {
  //     .container {
  //       width: 100%;
  //       height: 100%;
  //     }
  //     @media (min-width: 480px) and (max-width: 1200px) {
  //       .container {
  //         width: 60%;
  //       }
`;

const UserListContainer = styled(Container)`
  z-index: ${(props) => (props.showUsers ? Theme.zIndex.modal : "0")};
  position: absolute;
  height: 75vh;
  width: 50vw;
`;

const Chat = ({
  avatar,
  room = false,
  user,
  closeChatHandler,
  openBackdrop,
  socket,
  showUsers,
  setShowUsers,
  handleAddFriend,
  handleRemoveFriend,
  userRooms,
}) => {
  const [username, setUsername] = useState(user.displayName);
  // Controls which chat room is displayed on screen
  const [currentRoom, setRoom] = useState(room);
  // Users in current room, self and others
  const [users, setUsers] = useState("");
  // A count of the above data
  const [onlineUserCount, setOnlineUserCount] = useState(0);
  // Message  you are currently typing, yet to be sent to server/other users
  const [message, setMessage] = useState("");
  // Messages in memory, including messages retrieved from server and temporary messages from SYSTEM
  const [messages, setMessages] = useState([]);

  // PROD
  // const ENDPOINT = "https://react-chat-network-app.herokuapp.com/";
  // TESTING
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    // OLD LOGIC - Fetches username, room from url. Convert to state.
    // const { name, room } = queryString.parse(location.search);

    /* socket = io(ENDPOINT); */
    // Sets state equal to current room, stores Username
    setRoom(currentRoom);
    // setUsername(username);
    console.log("CURRENT ROOM" + JSON.stringify(currentRoom));
    // Fires socket.io "join" event when room state changes.
    //
    // socket.emit("join", { name: username, room: currentRoom }, (error) => {
    //     if (error) {
    //         alert(error);
    //     }
    // });
  }, [ENDPOINT, currentRoom]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // Message history of room you are currently in, retrieved from server
    socket.on("messageHistory", (messageHistory) => {
      if (messageHistory) {
        sortByDate(messageHistory);
        messageHistory.forEach((msg) => {
          if (msg.time) {
            setMessages((messages) => [...messages, msg]);
          }
        });
      }
    });

    // List of currently active users in room
    socket.on("roomData", ({ room, users, onlineUserCount }) => {
      console.log(`Room Data: \n${users}`);
      setUsers(users);
      setOnlineUserCount(users.length);
      console.log(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log({
      content: {
        text: message,
        user: username,
        time: getCurrentTime(),
        room: currentRoom,
        uid: user.uid,
      },
    });
    if (message) {
      socket.emit(
        "sendMessage",
        {
          content: {
            text: message,
            user: username,
            time: getCurrentTime(),
            room: currentRoom.id,
            uid: user.uid,
          },
        },
        () => setMessage("")
      );
      const newMessage = {
        text: message,
        time: getCurrentTime(),
        user: username,
        room: currentRoom,
        uid: user.uid,
      };
      setMessages((messages) => [...messages, newMessage]);
    }
  };

  // Opens user list
  const showUserDisplay = () => {
    openBackdrop();
    setShowUsers(true);
  };

  let id = currentRoom.id;
  let isSavedRoom = false;
  let isFavoriteRoom = false;

  userRooms.map((room) => {
    if (room.id === id) {
      isSavedRoom = true;
    }
  });

  userRooms.map((room) => {
    if (room.id === id) {
      isFavoriteRoom = true;
    }
  });

  return (
    <OuterContainer>
      <Container showUsers={showUsers}>
        <InfoBar
          room={currentRoom.roomName}
          userCount={onlineUserCount}
          showUserList={showUserDisplay}
          closeChatHandler={() => closeChatHandler(currentRoom)}
          userRooms={userRooms}
          isUserSavedRoom={isSavedRoom}
          isUserFavoriteRoom={isFavoriteRoom}
        />
        <Messages messages={messages} name={username} avatar={avatar} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Container>
      <UserListContainer showUsers={showUsers}>
        <UserList
          users={users}
          location={currentRoom.roomName}
          userID={user.uid}
          handleAddFriend={handleAddFriend}
          handleRemoveFriend={handleRemoveFriend}
        />
      </UserListContainer>
    </OuterContainer>
  );
};

export default Chat;
