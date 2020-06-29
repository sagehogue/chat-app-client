import React, { useState } from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import styled from "styled-components";

import Message from "./Message/Message";

// TODO: 
// Smarter message sorting
// Save the right messages, display SYSTEM messages differently
// Currently 

const MessagesStyle = styled.div`
  padding: 5% 0;
  flex: auto;
`;
const Messages = ({ messages, name }) => {
  console.log(messages)
  let lastUserToSendMessage;
  // if (messages.length) {
  //   lastUserToSendMessage = messages[messages.length - 1].user
  // }
  return (
    < MessagesStyle >
      <ScrollToBottom>
        {messages.map((message, i) => {
          let differentUser = lastUserToSendMessage !== message.user ? true : false
          lastUserToSendMessage = message.user
          return (
            <div key={i}>
              <Message
                message={message}
                user={name}
                shouldDisplayUsername={differentUser || lastUserToSendMessage === undefined ? true : false} />
            </div>
          )
        })}
      </ScrollToBottom>
    </MessagesStyle >
  )
};

export default Messages;
