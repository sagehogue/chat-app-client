import React, { useState } from "react";
import styled from "styled-components";

import {
  FaUsers,
  FaCog,
  FaPlus,
  FaMinus,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

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
  min-width: 30vw;
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

const CenterRightContainer = styled.div`
  margin: 0 0 0 auto;
  font-size: 1.75rem;
  position: relative;
`;
const OptionsMenu = styled.div`
  transition: all 0.3s;
  width: 12rem;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  z-index: ${({ visible }) => (visible ? "100" : "-1")};
  padding: 0.75rem;
  position: absolute;
  top: 2rem;
  left: -4.5rem;
  background-color: red;
  display: flex;
  flex-direction: column;
  vertical-align: center;
`;

const Option = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  &:last-of-type {
    margin-bottom: 0;
  }
`;
const Text = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  display: inline-block;
  width: 80%;
  text-align: end;
`;

// Needs access to user saved rooms, current room, favoriterooms
// Also needs a way to be closed on mobile

const InfoBar = ({
  room,
  closeChatHandler,
  userCount,
  showUserList,
  isUserSavedRoom = false,
  isUserFavoriteRoom = false,
}) => {
  const [optionMenuHovered, setOptionMenuHovered] = useState(false);
  const [isSavedRoom, setIsSavedRoom] = useState(isUserSavedRoom);
  const [isFavoriteRoom, setIsFavoriteRoom] = useState(isUserFavoriteRoom);
  const handleSetMenuToVisible = () => {
    setOptionMenuHovered(true);
  };
  const handleSetMenuToInvisible = () => {
    setOptionMenuHovered(false);
  };

  return (
    <InfoBarStyle>
      <LeftInnerContainer onClick={showUserList}>
        <FaUsers />
        <OnlineIcon src={onlineIcon} alt="online icon" />
        {userCount} online
      </LeftInnerContainer>
      <CenterInnerContainer> {room}</CenterInnerContainer>
      <CenterRightContainer
        onMouseEnter={handleSetMenuToVisible}
        onClick={handleSetMenuToVisible}
        onMouseLeave={handleSetMenuToInvisible}
      >
        <FaCog />
        <OptionsMenu visible={optionMenuHovered}>
          <Option>
            {isSavedRoom ? <FaMinus /> : <FaPlus />}
            <Text>
              {isSavedRoom ? "Removed from saved" : "Add to saved rooms"}
            </Text>
          </Option>
          <Option>
            {isFavoriteRoom ? <FaRegStar /> : <FaStar />}
            <Text>
              {isFavoriteRoom
                ? "Removed from favorites"
                : "Add to favorite rooms"}
            </Text>
          </Option>
        </OptionsMenu>
      </CenterRightContainer>
      <RightInnerContainer>
        <div onClick={(e) => closeChatHandler()}>
          <img src={closeIcon} alt="close icon" />
        </div>
      </RightInnerContainer>
    </InfoBarStyle>
  );
};

export default InfoBar;
