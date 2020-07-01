import React, { useEffect, useRef } from "react";


import styled from "styled-components";

import Message from "./Message/Message";

// TODO: 
// Smarter message sorting
// Save the right messages, display SYSTEM messages differently
// Get ScrollToBottom working
// Make a prettier/clearer way to display messages from SYSTEM/admin

const MessagesStyle = styled.div`
padding: 1.5% 0 1% 0;
  flex: auto;
  min-height: 70vh;
  overflow-y: scroll;

`;
const Messages = ({ messages, name }) => {
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages]);
  console.log(messages)
  let lastUserToSendMessage;
  // if (messages.length) {
  //   lastUserToSendMessage = messages[messages.length - 1].user
  // }
  return (
    <MessagesStyle>
      {messages.map((message, i) => {
        let differentUser = lastUserToSendMessage !== message.user ? true : false
        lastUserToSendMessage = message.user
        return (
          <Message
            key={i}
            message={message}
            user={name}
            shouldDisplayUsername={(differentUser || lastUserToSendMessage === undefined) && message.user !== "admin" ? true : false} />
        )
      })}
      <div ref={messagesEndRef} />
    </MessagesStyle >
  )
};

export default Messages;
