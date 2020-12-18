import React, { useState, useEffect } from "react";
// import queryString from "query-string"; // This was used to determine name/room
import io from "socket.io-client";
import styled from "styled-components";

import UserList from "../UI/UserList/UserList";
import TextContainer from "./TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "./InfoBar/InfoBar";
import Input from "../UI/Input/Input";
import RoomSettings from "./RoomSettings/RoomSettings";
import Theme from "../../util/Theme/Theme";

import { getCurrentTime, sortByDate } from "../../util/helpers/helpers.js";

// TODOS:

// Make chat window scrollable for users who wanna write textwalls

const OuterContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
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
  handleAddSavedRoom,
  handleRemoveSavedRoom,
  handleAddFavoriteRoom,
  handleRemoveFavoriteRoom,
  handleOpenRoomSettings,
  handleCloseRoomSettings,
  showRoomSettings,
}) => {
  const [username, setUsername] = useState(user.displayName);
  // Controls which chat room is displayed on screen
  const [currentRoom, setRoom] = useState(room);
  // Users in current room, self and others
  const [users, setUsers] = useState([]);
  // A count of the above data
  const [usersAndAvatars, setUsersAndAvatars] = useState([]);

  const [onlineUserCount, setOnlineUserCount] = useState(0);
  // Message  you are currently typing, yet to be sent to server/other users
  const [message, setMessage] = useState("");
  // Messages in memory, including messages retrieved from server and temporary messages from SYSTEM
  const [messages, setMessages] = useState([]);

  // PROD
  // const ENDPOINT = "https://react-chat-network-app.herokuapp.com/";
  // TESTING

  useEffect(() => {
    setRoom(currentRoom);
    // Fires socket.io "join" event when room state changes.
    //
    // socket.emit("join", { name: username, room: currentRoom }, (error) => {
    //     if (error) {
    //         alert(error);
    //     }
    // });
  }, [currentRoom]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("user-avatars", (userArray) => {
      console.log(userArray);
      setUsersAndAvatars(userArray);
    });

    // Message history of room you are currently in, retrieved from server
    socket.on("messageHistory", (messageHistory) => {
      if (messageHistory) {
        let foundIDs = [];
        let arrayOfMessageSenderIDs = [];
        sortByDate(messageHistory);
        messageHistory.forEach((msg) => {
          if (msg.time) {
            setMessages((messages) => [...messages, msg]);
          }
          if (!foundIDs.includes(msg.uid)) {
            arrayOfMessageSenderIDs.push({ id: msg.uid });
            foundIDs.push(msg.uid);
          }
        });
        console.log(arrayOfMessageSenderIDs);
        if (arrayOfMessageSenderIDs.length > 0) {
          socket.emit("fetch-avatars", {
            users: arrayOfMessageSenderIDs,
            socketEventString: "user-avatars",
          });
        }
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

  // intended to fetch avatars on user change
  useEffect(() => {
    console.log(users);
    if (users.length > 0) {
      socket.emit("fetch-avatars", {
        users,
        socketEventString: "user-avatars",
      });
    }

    // create list of IDs
    // get all documents for IDs on BE
    // attach avatars to IDs in array
    // return to FE and store in new state
    // on render, iterate through avatar list on each user to locate corresponding avatar url
  }, [users]);

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

  try {
    userRooms.map((room) => {
      if (room.id === id) {
        isSavedRoom = true;
      }
    });

    userRooms.map((room) => {
      if (room.id === id) {
        if (room.isFavorite) {
          isFavoriteRoom = true;
        }
      }
    });
  } catch (error) {
    console.log("error");
  }
  return (
    <>
      <OuterContainer>
        <Container showUsers={showUsers}>
          <InfoBar
            user={user}
            room={currentRoom.roomName}
            roomID={currentRoom.id}
            userCount={onlineUserCount}
            showUserList={showUserDisplay}
            closeChatHandler={() => closeChatHandler(currentRoom)}
            userRooms={userRooms}
            isUserSavedRoom={isSavedRoom}
            isFavoriteRoom={isFavoriteRoom}
            handleAddSavedRoom={handleAddSavedRoom}
            handleRemoveSavedRoom={handleRemoveSavedRoom}
            handleAddFavoriteRoom={handleAddFavoriteRoom}
            handleRemoveFavoriteRoom={handleRemoveFavoriteRoom}
            handleOpenRoomSettings={handleOpenRoomSettings}
          />
          <Messages
            messages={messages}
            name={username}
            avatar={avatar}
            users={usersAndAvatars}
          />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </Container>
        <UserList
          socket={socket}
          users={usersAndAvatars}
          location={currentRoom.roomName}
          userID={user.uid}
          handleAddFriend={handleAddFriend}
          handleRemoveFriend={handleRemoveFriend}
          shouldDisplay={showUsers}
        />
        <RoomSettings
          socket={socket}
          id={user.uid}
          room={currentRoom}
          avatarData={currentRoom.avatar ? currentRoom.avatar : false}
          shouldDisplay={showRoomSettings}
          handleCloseRoomSettings={handleCloseRoomSettings}
        ></RoomSettings>
      </OuterContainer>
    </>
  );
};

export default Chat;
