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
margin-top: 0;
//   @media (min-width: 320px) and (max-width: 480px) {
//     height: 100%;
//   }
`;

const JoinInnerContainer = styled.div`
display: flex;
  flex-direction: column;
  border-radius: .8rem;
  height: 85vh;
  width: 55vw;
`;

const Heading = styled.h1`
  color: ${Theme.offWhite};
  justify-self: flex-start;
  font-size: 2.5em;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
  margin-top: 0;
 
`;

const Directive = styled.h3`
color: ${Theme.offWhite};
margin-top: 1.5rem;
margin-bottom: 3rem;
font-size: 1.75rem;
`

const JoinInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  box-shadow: none;
`;

const JoinModal = styled.div`
margin-bottom: auto;
`
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