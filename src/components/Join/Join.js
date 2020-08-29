import React, { useState } from "react";

import styled from "styled-components";

import Theme from "../../util/Theme/Theme";

const JoinOuterContainer = styled.div`
display: flex;
grid-row: ${Theme.gridRowChat};
grid-column: ${Theme.gridColChat};
justify-content: center;
text-align: center;
align-items: center;
margin: auto;
@media screen and (max-height: 400px) {
  max-height: 75vh;
}

@media (min-width: 600px) and (max-height: 450px) {
  // max-height: 60vh;
}
`;

const JoinInnerContainer = styled.div`
display: flex;
  flex-direction: column;
  border-radius: .8rem;
  // height: 83vh;
  width: 55vw;
  margin: auto;
`;

const Heading = styled.h1`
  color: ${Theme.offWhite};
  justify-self: flex-start;
  font-size: 2.5rem;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
  margin-top: 0;
  @media (min-width: 600px) and (max-height: 450px) {
  font-size: 2.25rem;
  }
`;

const Directive = styled.h3`
color: ${Theme.offWhite};
margin-top: 1.5rem;
margin-bottom: 3rem;
font-size: 1.75rem;
@media (min-width: 600px) and (max-height: 450px) {
  margin-top: 1rem;
margin-bottom: 1.5rem;
font-size: 1.25rem;
}
`

const JoinInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  box-shadow: none;
  width: 100%;
  @media screen and (min-width: 1000px) {
    width: 75%;
  }
`;

const JoinModal = styled.div`
margin: 1rem auto auto auto

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
  margin-top: 20px;
  width: 100%;
  & :focus {
    outline: 0;
  }
  @media screen and (min-width: 1000px) {
    width: 50%;
  }
`;

export default function Join({ user, joinHandler }) {
  const [room, setRoom] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      //   do validation

      joinHandler(room)
    }
  }
  return (
    <JoinOuterContainer>
      <JoinInnerContainer>
        <Heading>Welcome {user.displayName}!</Heading>
        <Directive>Enter the name of the room you wish to join.</Directive>
        <JoinModal>
          <JoinInput
            placeholder="Room"
            type="text"
            onChange={event => setRoom(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <SignInButton type="submit" onClick={e => joinHandler(room)}>Sign In</SignInButton>
        </JoinModal>
      </JoinInnerContainer>
    </JoinOuterContainer>
  );
}