import React from "react";

import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

import {
  FaMinus,
  FaStar,
  FaRegStar,
  FaEllipsisH,
  FaDoorOpen,
} from "react-icons/fa";

const Styles = styled.div``;

const UserCountStyles = styled.span`
  position: absolute;
  top: -1.2rem;
  left: 0;
  text-align: center;
`;

const RoomNameStyles = styled.span`
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  background-color: rgba(3, 3, 3, 0.7);
  display: block;
  margin-top: auto;
  font-size: 1.65rem;
`;

const Card = styled.div`
  position: relative;
  background-color: ${Theme.offWhite};
  //   padding: 3rem 5rem;
  border-radius: 7px;
  margin: 1rem;
  padding: 0.325rem;
  min-height: 6.25rem;
  min-width: 11rem;
  margin-top: 0.5rem;
  overflow: hidden;
  color: ${Theme.offWhite};
  cursor: pointer;
  &:hover {
    & svg {
      z-index: 5;
      color: ${Theme.colors.primary};
      cursor: pointer;
      
    }
  }
`;

const Avatar = styled.img`
  min-height: 4rem;
  max-height: 6rem;
  min-width: 6rem;
  max-width: 9rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 0.5rem;
  color: ${Theme.colors.primary};

  & > svg:nth-of-type(2) {
    margin-left: auto;
  }
  & svg {
    transition: ${Theme.animations.buttonHoverEffectTransition};
    color: ${Theme.offWhite};
  }
`;

const RoomName = styled.span`
  padding: 0.35rem;
  display: inline-block;
  width: 100%;
  font-size: 1.25rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  font-weight: 500;
  background-color: ${Theme.colors.mostlyTransparentBlack};
  vertical-align: middle;
`;

const Center = styled.div`
  color: ${Theme.colors.accentMedium};

  display: flex;
  justify-content: center;
`;

export default function RoomCard({
  roomName,
  usercount,
  id,
  userID,
  avatar = false,
  isFavorite,
  joinHandler,
  addFavorite,
  removeFavorite,
  handleRemoveSavedRoom,
}) {
  console.log(userID);
  return (
    <Card
      onClick={(e) => {
        joinHandler({ roomName, id });
      }}
    >
      {avatar ? (
        <Avatar src={avatar.url} />
      ) : (
        <Center>
          <FaDoorOpen size={60} color={Theme.colors.accentMedium} />
        </Center>
      )}
      <Content>
        <FaEllipsisH size={20} />
        <RoomName>{roomName}</RoomName>
        {isFavorite ? (
          <FaRegStar
            onClick={(e) => {
              e.stopPropagation();
              removeFavorite(userID, id);
            }}
            size={20}
          />
        ) : (
          <FaStar
            onClick={(e) => {
              e.stopPropagation();
              addFavorite(userID, id);
            }}
            size={20}
          />
        )}
        <FaMinus
          size={20}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveSavedRoom(userID, id);
          }}
        />
      </Content>
    </Card>
  );
}
