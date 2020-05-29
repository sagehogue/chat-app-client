import React, { useState } from "react";

import styled, { keyframes, css } from 'styled-components';

import { SubmitButton } from '../UI/Button/Button'
import Login from "../Login/Login";
import Register from "../Register/Register";

const fadeOutKey = keyframes`
0% {
  opacity: 1;
}
50% {
    opacity: 1;
  }
100% {
  opacity: 0;
}`

const fadeInKey = keyframes`
0% {
  opacity: 0;
}
50% {
    opacity: 0;
  }
100% {
  opacity: 1;
}`

const fadeIn = props =>
  css`
    ${fadeInKey} 1s;
  `

const fadeOut = props =>
  css`
    ${fadeOutKey} 1s;
  `

// TODOS
// 1. Implement password verification - 2 fields must match, 
// be of appropriate length + complexity
// 2. Email must be appropriately formatted and available.
// 3. Username must be of appropriate length, comprised of allowable chars, available.

const RegisterFormStyle = styled.form`
  position: absolute;
  top: 0;
  left: 0;
  animation-fill-mode: forwards;
  margin: auto;
  transition: all 0.5s ease-in;
  animation: ${props => (props.animateLoginForm ? `${fadeOut}` : 'none')};
  animation: ${props => (props.showRegisterForm ? `${fadeIn}` : 'none')};
  opacity: ${props => (props.showRegisterForm ? 1 : 0)};
  z-index: ${props => (props.showRegisterForm ? 10 : 0)};
  pointer-events: ${props => (props.showRegisterForm ? "auto" : "none")};
`;

const Heading = styled.h1`
  color: white;
  font-size: 3.1rem;
  font-family: "Josefin Sans", sans-serif;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
`;
const EmailInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const UserInput = styled.input`
  border-radius: 0;
  margin-top: 20px;
  padding: 15px 20px;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
`;
const PasswordInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
`;
const PasswordInputConfirm = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const CreateButton = styled(SubmitButton)`
  background: #157f1f;
  border: none;
  width: 75%;
  margin-top: 1.5rem;
`;
export default function RegisterForm({ showRegisterForm, heading, handleSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordConfirmation = (event) => {
    // Implement this logic
    setPasswordConfirm(event.target.value)
  }
  return (
    <RegisterFormStyle showRegisterForm={showRegisterForm} onSubmit={handleSubmit}>
      <Heading>
        {`${heading}`}
      </Heading>
      <EmailInput
        required
        placeholder="Email"
        name="email"
        type="text"
        onChange={event => setEmail(event.target.value)}
      />

      <UserInput

        placeholder="Username"
        name="username"
        type="text"
        onChange={event => setUsername(event.target.value)}
      />

      <PasswordInput
        required
        placeholder="Password"
        name="password"
        type="password"
        onChange={event => setPassword(event.target.value)}
      />

      <PasswordInputConfirm
        placeholder="Confirm Password"
        type="text"
        onChange={event => handlePasswordConfirmation(event)}
      />

      <CreateButton type="submit" value="Create" />
    </RegisterFormStyle>
  );
}
