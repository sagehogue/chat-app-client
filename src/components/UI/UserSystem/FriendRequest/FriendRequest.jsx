import React from "react";
import styled from "styled-components";

import { FaUserSecret } from "react-icons/fa";

const Styles = styled.div`
  transition: all 0.4s;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  background-color: rgba(25, 25, 25, 0.15);
  border: 1px solid grey;
  &:hover {
    border: 1px solid rgba(0, 200, 75, 0.55);
  }
`;

const RequestOption = styled.button`
  transition: all 0.2s;
  padding: 0.4rem 1rem;
  background-color: rgba(100, 100, 100, 0.5);
  font-size: 0.9rem;
  color: rgba(240, 240, 240, 0.95);
  border: none;
  &:hover {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.75);
  }
  &:nth-of-type(1) {
    margin-left: auto;
    margin-right: 1.25rem;
  }
  &:nth-of-type(2) {
    margin-right: auto;
  }
`;

const Avatar = styled.img``;

const Top = styled.div`
  padding-bottom: 0.25rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
`;

const Bottom = styled.div`
  display: flex;
`;

const Username = styled.span`
  z-index: 1;
  display: inline-block;
  min-width: 90%;
  text-align: center;
  margin: auto;
`;

const Frame = styled.div`
  //   display: inline-block;
  z-index: 2;
  position: absolute;
`;

export default function FriendRequest({
  displayName,
  avatar = false,
  handleAccept,
  handleDecline,
  clientID,
  requesterID,
  deleteSelf,
  
}) {
  let pic;
  
  if (avatar) {
    
    pic = <Avatar src={avatar.url} />;
  } else {
    pic = <FaUserSecret size={30} />;
  }
  return (
    <Styles>
      <Top>
        <Frame>{pic}</Frame>
        <Username>{displayName}</Username>
      </Top>
      <Bottom>
        <RequestOption
          onClick={() => {
            handleAccept(clientID, requesterID);
            deleteSelf();
          }}
        >
          Accept
        </RequestOption>
        <RequestOption
          onClick={() => {
            handleDecline(clientID, requesterID);
            deleteSelf();
          }}
        >
          Decline
        </RequestOption>
      </Bottom>
    </Styles>
  );
}
