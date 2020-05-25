import React, { useState } from "react";

import styled from "styled-components";
import Login from "../Login/Login";
import Register from "../Register/Register";

const RegisterFormStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
  transition: all 0.5s ease-in;
  opacity: ${props => (props.showRegisterForm ? 1 : 0)};
  z-index: ${props => (props.showRegisterForm ? 10 : 0)};
  pointer-events: ${props => (props.showRegisterForm ? "auto" : "none")};
`;

const Heading = styled.h1`
  color: white;
  font-size: 2.5em;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
`;
const EmailInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
`;

const UserInput = styled.input`
  border-radius: 0;
  margin-top: 20px;
  padding: 15px 20px;
  width: 100%;
`;
const PasswordInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  margin-top: 20px;
`;
const PasswordInputConfirm = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  margin-top: 20px;
`;

const CreateButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #157f1f;
  padding: 1.25rem;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  margin-top: 1.5rem;
  transition: all 0.15s;

  &:hover {
    transform: scale(1.1) translateY(-0.5rem);
    box-shadow: 0rem 0.15rem #333;
  }
  &:focus {
    outline: none;
    border: none;
  }
  &:active {
    outline: none;
    border: none;
    background: #1fd131;
  }
`;
export default function RegisterForm({ showRegisterForm, heading }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [email, setEmail] = useState("");

  return (
    <RegisterFormStyle showRegisterForm={showRegisterForm}>
      <Heading>{`${heading}`}</Heading>
      <EmailInput
        placeholder="Email"
        type="text"
        onChange={event => setEmail(event.target.value)}
      />

      <UserInput
        placeholder="Username"
        type="text"
        onChange={event => setName(event.target.value)}
      />

      <PasswordInput
        placeholder="Password"
        type="text"
        onChange={event => setRoom(event.target.value)}
      />
      <PasswordInputConfirm
        placeholder="Confirm Password"
        type="text"
        onChange={event => setRoom(event.target.value)}
      />
      <CreateButton>Create</CreateButton>
    </RegisterFormStyle>
  );
}
