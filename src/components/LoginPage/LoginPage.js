import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Login from "../Login/Login";
import Register from "../Register/Register";
import RegisterForm from "../RegisterForm/RegisterForm";

const AuthButtons = styled.div`
  // transform: translateY(20vh);
`;

const OuterFormContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-color: #1a1a1d;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;

const InnerFormContainer = styled.div`
  position: relative;
  height: 50%;

  width: 20%;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 90%;
  }
`;

const LoginForm = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;

  transition: all 0.5s;
  opacity: ${props => (props.showRegisterForm ? 0 : 1)};
  z-index: ${props => (props.showRegisterForm ? 0 : 10)};
  pointer-events: ${props => (props.showRegisterForm ? "none" : "auto")};
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
const SignInButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: rgba(41, 121, 255, 0.75);
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
    background: rgba(41, 121, 255, 1);
  }
  & :focus {
    outline: none;
    border: none;
  }
  & :active {
    outline: none;
    border: none;
  }
`;

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [heading, setHeading] = useState("Chatter");
  const [email, setEmail] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const RegisterHandler = () => {
    setShowRegisterForm(true);
  };

  return (
    <OuterFormContainer>
      <InnerFormContainer>
        <LoginForm showRegisterForm={showRegisterForm}>
          <Heading>{`${heading}`}</Heading>
          <div>
            <EmailInput
              placeholder="Email"
              type="text"
              onChange={event => setEmail(event.target.value)}
            />

            {/* <UserInput
          // placeholder="Username"
          // type="text"
          // onChange={event => setName(event.target.value)}
          /> */}
          </div>
          <div>
            <PasswordInput
              placeholder="Password"
              type="text"
              onChange={event => setRoom(event.target.value)}
            />
          </div>
          <AuthButtons>
            <Link
              onClick={e => (!name || !room ? e.preventDefault() : null)}
              to={`/chat?name=${name}&room=${room}`}
            >
              <SignInButton type="submit">Sign In</SignInButton>
            </Link>
            <Register clickHandler={() => RegisterHandler()} />
          </AuthButtons>
        </LoginForm>
        <RegisterForm heading={heading} showRegisterForm={showRegisterForm}>
          {/* code */}
        </RegisterForm>
      </InnerFormContainer>
    </OuterFormContainer>
  );
}
