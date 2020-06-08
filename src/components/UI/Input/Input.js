import React from "react";

import styled from "styled-components";

const Form = styled.form`
  display: flex;
  border-top: 2px solid #d3d3d3;
`;

const InputStyle = styled.input`
  border: none;
  border-radius: 0;
  padding: 5%;
  width: 80%;
  font-size: 1.2em;
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
  padding: 20px;
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
