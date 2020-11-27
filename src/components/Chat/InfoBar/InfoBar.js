import React, { useState } from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme.js";

import {
  FaUsers,
  FaCog,
  FaPlus,
  FaMinus,
  FaStar,
  FaRegStar,
  FaEllipsisH,
} from "react-icons/fa";

import onlineIcon from "../../../icons/onlineIcon.png";
import closeIcon from "../../../icons/closeIcon.png";

const InfoBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background: #2979ff;
  background-color: ${Theme.theme3.color4};
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
  cursor: pointer;
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
  background-color: ${Theme.theme3.color5};
  border-radius: ${Theme.borderRadiusBtn};
  display: flex;
  flex-direction: column;
  vertical-align: center;
  color: ${Theme.textColorLight};
`;

const Option = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  &:last-of-type {
    margin-bottom: 0;
  }
  &:hover {
    cursor: pointer;
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
  roomID,
  user,
  closeChatHandler,
  userCount,
  showUserList,
  userRooms,
  isUserSavedRoom = false,
  isFavoriteRoom,
  handleAddSavedRoom,
  handleRemoveSavedRoom,
  handleAddFavoriteRoom,
  handleRemoveFavoriteRoom,
  handleOpenRoomSettings,
}) => {
  const [optionMenuHovered, setOptionMenuHovered] = useState(false);

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
            {/* add on click to faminus and faplus to initiate saved room */}

            {isUserSavedRoom ? (
              <FaMinus
                onClick={() => {
                  console.log("REMOVING ROOM");
                  handleRemoveSavedRoom(user.uid, roomID);
                }}
              />
            ) : (
              <FaPlus
                onClick={() => {
                  handleAddSavedRoom(user.uid, roomID);
                }}
              />
            )}
            <Text>
              {isUserSavedRoom ? "Remove from saved" : "Add to saved"}
            </Text>
          </Option>
          <Option>
            {isFavoriteRoom ? (
              <FaStar
                onClick={() => {
                  console.log("fave");
                  handleRemoveFavoriteRoom(user.uid, roomID);
                }}
              />
            ) : (
              <FaRegStar
                onClick={() => {
                  console.log("not fave");
                  handleAddFavoriteRoom(user.uid, roomID);
                }}
              />
            )}
            <Text>
              {isFavoriteRoom ? "Remove from favorites" : "Add to favorites"}
            </Text>
          </Option>
          <Option>
            <FaEllipsisH onClick={handleOpenRoomSettings} />
            <Text>Additional Settings</Text>
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
