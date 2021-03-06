import React from "react";
import styled from "styled-components";

import ReactEmoji from "react-emoji";

// TODOS
// Make profile pictures display

const MessageText = styled.p`
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1rem;
  word-wrap: break-word;
  color: ${(props) => (props.dark ? "#353535" : "#f2f2f2")};
`;

const MessageBox = styled.div`
background-color: ${props => (props.blue ? "#2979ff" : "#f3f3f3")};
border-radius: 20px;
padding: 1rem .5rem;
color: white;
display: inline-block;
`;

const SentText = styled.span`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  padding: 0 .5rem;
  letter-spacing: 0.3px;
  // ${(props) => (props.pl ? "padding-left: .5rem;" : null)}
  // ${(props) => (props.pr ? "padding-right: .5rem;" : null)}
`;

const MessageContainerJE = styled.div`
  display: flex;
  justify-content: space-around;
  // padding: 0 .5rem;
  margin-top: 3px;
  overflow: hidden;
  width: 100%;
  & > :nth-child(1) {
    margin: 0 auto auto 0;
  }
  & > :nth-child(2) {
    margin: auto;
    min-width: 50vw;
  }
`;
const MessageContainerJS = styled.div`
  display: flex;
  justify-content: flex-start;
  // padding: 0 .5rem;
  margin-top: 3px;
  overflow: hidden;
  width: 100%;
  & > :nth-child(1) {
    margin: auto;
    min-width: 50vw;
  }
  & > :nth-child(2) {
    margin: 0 0 auto auto;
  }
`;

const Message = ({ message, name }) => {
  let isSentByCurrentUser = false;
  console.log(message)
  let text, user, timeSent, profilePic;
  timeSent = message.time
  text = message.text
  user = message.user
  if (message.profilePic) {
    profilePic = message.profilePic
  }

  console.log(text, user, timeSent);

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }


  return isSentByCurrentUser ? (
    <MessageContainerJE>
      <SentText>{trimmedName}</SentText>
      <MessageBox blue>
        <MessageText>{ReactEmoji.emojify(text + '')}</MessageText>
      </MessageBox>
    </MessageContainerJE>
  ) : (
      <MessageContainerJS>
        <MessageBox>
          <MessageText dark>{ReactEmoji.emojify(text + '')}</MessageText>
        </MessageBox>
        <SentText>{user}</SentText>
      </MessageContainerJS>
    );
};

export default Message;
