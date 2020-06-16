import React from "react";

import styled from "styled-components";

// TODO:
// Make sexy word wrapping capabilities so people can type 
// out walls of text easily.

const Form = styled.form`
  display: flex;
  width: 55vw;
  border-top: 2px solid #d3d3d3;
`;

const InputStyle = styled.input`
  border: none;
  width: 80%;
  min-height: 12.5vw;
  border-radius: 0;
  padding: 3%;
  font-size: 1.1em;
  &:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979ff;
  padding: .5rem;
  display: inline-block;
  border: none;
  width: 20%;
`;
const Input = ({ setMessage, sendMessage, message }) => (
  <Form>
    <InputStyle
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => (event.key === "Enter" ? sendMessage(event) : null)}
    />
    <SendButton onClick={e => sendMessage(e)}>Send</SendButton>
  </Form>
);

export default Input;
