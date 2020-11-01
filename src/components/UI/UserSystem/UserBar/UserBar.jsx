import React from "react";
import styled from "styled-components";
import {
  FaUserSecret,
  FaUserSlash,
  FaUserPlus,
  FaStar,
  FaRegStar,
  FaUserMinus,
  FaEnvelope,
  FaRegTimesCircle,
} from "react-icons/fa";

const Bar = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(5, 1fr);
  transition: all 0.3s;
  padding: 0.4rem;
  margin: 0.35rem;
  // background-color: ${(props) => props.color}
  // display: flex;
  min-height: 2 rem;
  max-height: 4rem;
  border: 1px solid rgba(225, 225, 225, 0.45);
  &:hover {
    // padding: 0.6rem 0.5rem;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.75);
    & span {
      transform: scale(1);
    }
  }
`;

const Avatar = styled.div`
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  vertical-align: center;
  overflow: hidden;
  text-align: center;
  width: 100%;
  & svg {
    margin: auto;
  }
`;

const AvatarIMG = styled.img`
  // min-height: 2rem;
  // max-height: 3.8rem;
  // min-width: 2rem;
  // max-width: 3.8rem;
  width: 100%;
  height: 100%;
  display: block;
  margin: auto;
`;

const DisplayName = styled.span`
  grid-row: 1 / 2;
  grid-column: 2 / 5;
  font-size: 1rem;
  width: 90%;
  margin-left: auto;
  font-weight: 700;
  font-size: 1.25rem;
  color: white;
`;

const SentFriendRequestDisplayName = styled(DisplayName)`
  grid-row: 1 / 3;
  margin: auto auto auto 0;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  grid-row: 1 / 3;
  grid-column: 5 / 6;
  z-index: 5;
`;

const SentFriendRequestControls = styled(Controls)`
  justify-content: space-around;
  align-items: flex-start;
  z-index: 5;
`;

const Status = styled.span`
  grid-row: 2 / 3;
  grid-column: 2 / 5;
`;

export default function UserBar({
  id,
  clientID,
  addFavoriteHandler,
  removeFavoriteHandler,
  removeFriendHandler,
  displayName,
  status = false,
  avatar = false,
  online = false,
  isFavorite = false,
  dmHandler,
  deleteHandler,
  handleCancelFriendRequest,
  type = false,
  deleteSelf,
}) {
  console.log(isFavorite);
  if (type) {
    if (type == "SENTREQUEST") {
      return (
        <Bar>
          <Avatar>
            {avatar ? (
              <AvatarIMG src={avatar.url} alt={"User Picture"} />
            ) : (
              <FaUserSecret size={35} />
            )}
          </Avatar>
          <SentFriendRequestDisplayName>
            {displayName}
          </SentFriendRequestDisplayName>
          <SentFriendRequestControls>
            <FaRegTimesCircle
              size={20}
              onClick={() => {
                console.log(id);
                handleCancelFriendRequest(clientID, id);
                deleteSelf();
              }}
            />
          </SentFriendRequestControls>
        </Bar>
      );
    }
  } else {
    return (
      <Bar>
        <Avatar>
          {avatar ? (
            <AvatarIMG src={avatar.url} alt={"User Picture"} />
          ) : (
            <FaUserSecret size={45} />
          )}
        </Avatar>
        <DisplayName>{displayName}</DisplayName>
        <Status>{status ? status : ""}</Status>
        <Controls>
          <FaEnvelope
            size={20}
            onClick={() => {
              dmHandler(clientID, id);
            }}
          />
          <FaUserMinus
            size={20}
            onClick={() => {
              deleteHandler(clientID, id, deleteSelf);
            }}
          />

          {isFavorite ? (
            <FaStar
              size={20}
              onClick={() => {
                removeFavoriteHandler(clientID, id);
              }}
            />
          ) : (
            <FaRegStar
              size={20}
              onClick={() => {
                addFavoriteHandler(clientID, id);
              }}
            />
          )}
        </Controls>
      </Bar>
    );
  }
}
