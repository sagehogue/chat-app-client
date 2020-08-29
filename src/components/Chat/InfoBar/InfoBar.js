import React from "react";
import styled from "styled-components";

import { FaUsers } from "react-icons/fa";

import onlineIcon from "../../../icons/onlineIcon.png";
import closeIcon from "../../../icons/closeIcon.png";

const InfoBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2979ff;
  border-radius: 4px 4px 0 0;
  min-height: 3rem;
  width: 100%;
  @media (min-width: 600px) and (max-height: 450px) {
    height: 2.5rem;
  }
`;

const LeftInnerContainer = styled.div`
  // flex: 0.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 3%;
  min-height: 3rem;
  min-width: 10vw;
  & svg {
    font-size: 1.5rem;
  }
`;

const CenterInnerContainer = styled.div`
  color: white;
  font-size: 1.25rem;
  min-width: 20vw;
  text-align: center;
  margin-left: auto;
`;

const RightInnerContainer = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: flex-end;
  margin-right: 2%;
  margin-left: auto;
`;

const OnlineIcon = styled.img`
  margin-right: 5%;
`;

const InfoBar = ({ room, closeChatHandler, userCount, showUserList }) => (
  <InfoBarStyle>
    <LeftInnerContainer onClick={showUserList}>
      <FaUsers />
      <OnlineIcon src={onlineIcon} alt="online icon" />
      {userCount} online
    </LeftInnerContainer>
    <CenterInnerContainer> {room}</CenterInnerContainer>
    <RightInnerContainer>
      <div onClick={(e) => closeChatHandler()}>
        <img src={closeIcon} alt="close icon" />
      </div>
    </RightInnerContainer>
  </InfoBarStyle>
);

export default InfoBar;
