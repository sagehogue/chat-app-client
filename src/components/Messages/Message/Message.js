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
const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

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
