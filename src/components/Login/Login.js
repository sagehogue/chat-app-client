import React from "react";
import styled from "styled-components";

// ${props =>
//   props.loggedIn ? "background-color: green" : "background-color: red"};

const LoginButton = styled.button`
  margin-left: 100px;
  // ^for dev purposes
  margin-top: 10%;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(#e0920b, #bf8116);
  color: #fff;
  border: none;
  border-radius: 0.275rem;
  font-size: 1rem;
  transition: all 0.08s;
  &:hover {
    background-image: linear-gradient(#f7b440, #f7ab27);
    transform: scale(1.1);
    box-shadow: 0rem 0.15rem #333;
  }
`;

export default function Login() {
  return (
    <LoginButton>
      login
      {/*     
      // onClick={props.loggedIn ? props.handleLogout : props.handleLogin}
      // > // {props.loggedIn ? "log out" : "login"}
     */}
    </LoginButton>
  );
}
