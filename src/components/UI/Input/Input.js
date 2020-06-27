import React from "react";

import styled from "styled-components";

// TODO:
// Make sexy word wrapping capabilities so people can type 
// out walls of text easily.

// Add styling breakpoints - mobile first

const Form = styled.form`
  display: flex;
  width: inherit;
  border-top: 2px solid #d3d3d3;
`;

const InputStyle = styled.textarea`
  border: none;
  resize: none;
  width: 78%;
  overflow: scroll-y;
  min-height: 7vh;
  word-wrap: break-word;
  whitespace: wrap;
  border-radius: 0;
  padding: .5rem;
  font-size: .85rem;
  &:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
  @media screen and (min-width: 800px) {
    padding: 1rem;
    font-size: 1rem;
  }
  @media screen and (min-width: 1200px) {
    padding: 1.25rem;
    font-size: 1.15rem;
    min-height: 12.5vh;
  }
  @media screen and (min-width: 1600px) {
    padding: 1.5rem;
  }
          @media (max-height: 450px) and (min-width: 550px) {
          min-height: 6.75vh;
        }
`;

const SendButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979ff;
  padding: 2px;
  display: inline-block;
  border: none;
  width: 22%;
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
