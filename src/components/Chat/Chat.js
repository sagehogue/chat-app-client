import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';
=======
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";
>>>>>>> dec9935a3327f276187cd033f7010dcf570db7fb

let socket;

const Chat = ({ location }) => {
<<<<<<< HEAD
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
=======
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // PROD
  // const ENDPOINT = "https://react-chat-network-app.herokuapp.com/";
  // TESTING
  const ENDPOINT = "localhost:5000";
>>>>>>> dec9935a3327f276187cd033f7010dcf570db7fb

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
<<<<<<< HEAD
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
=======
    setName(name);

    socket.emit("join", { name, room }, error => {
      if (error) {
>>>>>>> dec9935a3327f276187cd033f7010dcf570db7fb
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
<<<<<<< HEAD
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
=======

  useEffect(() => {
    socket.on("message", message => {
      console.log(message);
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", { message, room }, () => setMessage(""));
    }
  };
>>>>>>> dec9935a3327f276187cd033f7010dcf570db7fb

  return (
    <div className="outerContainer">
      <div className="container">
<<<<<<< HEAD
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}
=======
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};
>>>>>>> dec9935a3327f276187cd033f7010dcf570db7fb

export default Chat;
