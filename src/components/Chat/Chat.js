import React, { useState, useEffect } from "react";
// import queryString from "query-string"; // This was used to determine name/room
import io from "socket.io-client";
import styled from "styled-components";

import TextContainer from "./TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "./InfoBar/InfoBar";
import Input from "../UI/Input/Input";
import Theme from "../../util/Theme/Theme";

import { getCurrentTime, sortByDate } from '../../util/helpers/helpers.js'

// TODOS:

// Create component to display users in room
// Make chat window draggable for users who wanna write textwalls

const OuterContainer = styled.div`
display: flex;
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
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: .8rem;
  height: 84vh;
  width: 58vw;
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

let socket;

const Chat = ({ room = false, user, closeChatHandler, socket }) => {
    const [username, setUsername] = useState(user.displayName);
    const [currentRoom, setRoom] = useState(room);
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
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
        console.log({ content: { text: message, user: username, time: getCurrentTime(), room: currentRoom } })
        if (message) {
            socket.emit("sendMessage", { content: { text: message, user: username, time: getCurrentTime(), room: currentRoom } }, () => setMessage(""));
            const newMessage = {
                text: message,
                time: getCurrentTime(),
                user: username,
                room: currentRoom 
            }
            setMessages((messages) => [...messages, newMessage]);
        }
    };

    return (
        <OuterContainer>
            <Container>
                <InfoBar room={currentRoom} closeChatHandler={() => closeChatHandler(currentRoom)} />
                <Messages messages={messages} name={username} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </Container>
        </OuterContainer>
    );
};

export default Chat;
