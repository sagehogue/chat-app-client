import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const JoinOuterContainer = styled.div`
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

const JoinInnerContainer = styled.div`
  width: 20%;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 90%;
  }
`;

const Heading = styled.h1`
  color: white;
  font-size: 2.5em;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
`;

const JoinInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
`;
const JoinInputMt20 = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  margin-top: 20px;
`;
const SignInButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979ff;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  margin-top: 20px;
  & :focus {
    outline: 0;
  }
`;

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <JoinOuterContainer>
      <JoinInnerContainer>
        <Heading>Join</Heading>
        <div>
          <JoinInput
            placeholder="Name"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <JoinInputMt20
            placeholder="Room"
            type="text"
            onChange={event => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={e => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <SignInButton type="submit">Sign In</SignInButton>
        </Link>
      </JoinInnerContainer>
    </JoinOuterContainer>
  );
}
