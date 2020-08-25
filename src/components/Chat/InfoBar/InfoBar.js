import React from "react";

import onlineIcon from "../../../icons/onlineIcon.png";
import closeIcon from "../../../icons/closeIcon.png";

import styled from "styled-components";

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
  flex: 0.5;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: white;
`;

const CenterInnerContainer = styled.div`
`

const RightInnerContainer = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: flex-end;
  margin-right: 5%;
`;

const OnlineIcon = styled.img`
  margin-right: 5%;
`;

const InfoBar = ({ room, closeChatHandler, userCount }) => (
  <InfoBarStyle>
    <LeftInnerContainer>
      <OnlineIcon src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </LeftInnerContainer>
<CenterInnerContainer>{userCount} online</CenterInnerContainer>
    <RightInnerContainer>
      <div onClick={e => closeChatHandler()}>
        <img src={closeIcon} alt="close icon" />
      </div>
    </RightInnerContainer>
  </InfoBarStyle>
);

export default InfoBar;
