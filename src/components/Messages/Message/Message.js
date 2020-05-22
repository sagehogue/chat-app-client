import React from "react";
import styled from "styled-components";

import ReactEmoji from "react-emoji";

const MessageText = styled.p`
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
  color: ${props => (props.dark ? "#353535" : "#f2f2f2")};
`;

const MessageBox = styled.div`
background-color: ${props => (props.blue ? "#2979ff" : "#f3f3f3")}

border-radius: 20px;
padding: 5px 20px;
color: white;
display: inline-block;
max-width: 80%;
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

const MessageContainerJE = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5%;
  margin-top: 3px;
`;
const MessageContainerJS = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 5%;
  margin-top: 3px;
`;

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  console.log(text, user, name);

  return isSentByCurrentUser ? (
    <MessageContainerJE>
      <SentText pr10>{trimmedName}</SentText>
      <MessageBox blue>
        <MessageText>{ReactEmoji.emojify(text)}</MessageText>
      </MessageBox>
    </MessageContainerJE>
  ) : (
    <MessageContainerJS>
      <MessageBox>
        <MessageText dark>{ReactEmoji.emojify(text)}</MessageText>
      </MessageBox>
      <SentText pl10>{user}</SentText>
    </MessageContainerJS>
  );
};

export default Message;
