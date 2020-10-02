import React from "react";
import styled from "styled-components";
import {
  FaUserSecret,
  FaUserSlash,
  FaUserPlus,
  FaUserMinus,
  FaEnvelope,
  FaRegTimesCircle,
} from "react-icons/fa";

const Bar = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(5, 1fr);
  transition: all 0.3s;
  padding: 0.3rem 0.5rem;
  // background-color: ${(props) => props.color}
  // display: flex;
  min-height: 1.5rem;
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
`;

const DisplayName = styled.span`
  grid-row: 1 / 2;
  grid-column: 2 / 5;
  font-size: 1rem;
  color: white;
`;

const SentFriendRequestDisplayName = styled(DisplayName)`
  grid-row: 1 / 3;
  margin: auto auto auto 0;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 1 / 3;
  grid-column: 5 / 6;
  z-index: 5;
`;

const SentFriendRequestControls = styled(Controls)`
  justify-content: space-around;
  align-items: center;
  z-index: 5;
`;

const Status = styled.span`
  grid-row: 2 / 3;
  grid-column: 2 / 5;
`;

export default function UserBar({
  id,
  clientID,
  removeFavoriteHandler,
  removeFriendHandler,
  displayName,
  status = false,
  avatar = false,
  online = false,
  dmHandler,
  deleteHandler,
  handleCancelFriendRequest,
  type = false,
  deleteSelf,
}) {
  if (type) {
    if (type == "SENTREQUEST") {
      console.log(id + clientID);
      return (
        <Bar>
          <Avatar>
            {avatar ? (
              <img src={avatar} alt={"User Picture"} />
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
            <img src={avatar} alt={"User Picture"} />
          ) : (
            <FaUserSecret size={35} />
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
        </Controls>
      </Bar>
    );
  }
}
