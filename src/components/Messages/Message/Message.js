<<<<<<< HEAD
import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

=======
import React from "react";
import styled from "styled-components";

import "./Message.css";

import ReactEmoji from "react-emoji";
const MessageText = styled.p`
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
  color: ${props => (props.dark ? "#353535" : "#f2f2f2")};
`;

const SentText = styled.p`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
  ${props => (props.pl10 ? "padding-left: 10px;" : null)}
  ${props => (props.pr10 ? "padding-right: 10px;" : null)}
`;
>>>>>>> dec9935a3327f276187cd033f7010dcf570db7fb
const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

<<<<<<< HEAD
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;
=======
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  console.log(text, user, name);

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <SentText pr10>{trimmedName}</SentText>
      <div className="messageBox backgroundBlue">
        <MessageText>{ReactEmoji.emojify(text)}</MessageText>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <MessageText dark>{ReactEmoji.emojify(text)}</MessageText>
      </div>
      <SentText pl10>{user}</SentText>
    </div>
  );
};

export default Message;
>>>>>>> dec9935a3327f276187cd033f7010dcf570db7fb
