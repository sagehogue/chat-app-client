import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import styled from "styled-components";

import Message from "./Message/Message";

const MessagesStyle = styled.div`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`;
const Messages = ({ messages, name }) => (
  <MessagesStyle>
    <ScrollToBottom>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  </MessagesStyle>
);

export default Messages;
