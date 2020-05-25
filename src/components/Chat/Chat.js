import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import styled from "styled-components";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import { getCurrentTime, sortByDate } from '../../util/helpers/helpers.js'

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1d;
  .outerContainer {
    height: 100%;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 8px;
  height: 60%;
  width: 35%;
  @media (min-width: 320px) and (max-width: 480px) {
    .container {
      width: 100%;
      height: 100%;
    }
    @media (min-width: 480px) and (max-width: 1200px) {
      .container {
        width: 60%;
      }
`;

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // PROD
  // const ENDPOINT = "https://react-chat-network-app.herokuapp.com/";
  // TESTING
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });



    socket.on("messageHistory", messageHistory => {
      if (messageHistory) {
        sortByDate(messageHistory)
        messageHistory.forEach(msg => {
          if (msg.time) {
            setMessages(messages => [...messages, msg])
          }
        })
      }
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", { content: { text: message, user: name, time: getCurrentTime(), room: room } }, () => setMessage(""));
    }
  };

  return (
    <OuterContainer>
      <Container>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Container>
      <TextContainer users={users} />
    </OuterContainer>
  );
};

export default Chat;
