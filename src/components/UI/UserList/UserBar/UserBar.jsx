import React from "react";
import styled from "styled-components";

import {
  FaUserSecret,
  FaUserSlash,
  FaUserPlus,
  FaUserMinus,
  FaEnvelope,
} from "react-icons/fa";

const UserBarStyle = styled.li`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0.5rem 0.25rem;
  margin: 1rem 0;
  background-color: offwhite;
  border: solid medium rgba(46, 49, 49, 0.6);
  text-align: center;
  align-items: center;
`;

const Username = styled.span`
  color: lightslategray;
  margin-left: 2rem;
`;

const UserAvatar = styled.span`

  font-size: 1.75rem;
  margin-left: 1rem;
`;

const UserActionIcons = styled.span`
  font-size: 1.75rem;
  margin-left: auto;
  margin-right: 1.25rem;
  display: flex;
  justify-content: space-between;
  & svg {
    margin: auto 0.25rem;
  }
`;

// Needs to support user avatars, add/remove friend, block, send message (for DMs)
// Tooltips over the icons would be useful

export default function UserBar({
  avatar = "default",
  isUser,
  username,
  friend,
  addFriendHandler,
  removeFriendHandler,
  addFavoriteHandler,
  removeFavoriteHandler,
  id,
  clientID,
}) {
  if (avatar == "default") {
    avatar = <FaUserSecret />;
  }
  let friendOperation = (
    <FaUserPlus
      onClick={() => {
        addFriendHandler(clientID, id, username);
      }}
    />
  );
  if (friend) {
    friendOperation = (
      <FaUserMinus
        onClick={() => {
          removeFriendHandler(clientID, id);
        }}
      />
    );
  }
  //   if (userIsFriend) {
  // display FaUserMinus
  // } else {
  // display FaUserPlus
  //   }
  let clientUserBar = (
    <UserBarStyle>
      <UserAvatar>
        <FaUserSecret />
      </UserAvatar>
      <Username>{username}</Username>
      <UserActionIcons></UserActionIcons>
    </UserBarStyle>
  );
  return isUser ? (
    clientUserBar
  ) : (
    <UserBarStyle>
      <UserAvatar>
        <FaUserSecret />
      </UserAvatar>
      <Username>{username}</Username>
      <UserActionIcons>
        <FaEnvelope />
        {friendOperation}
        <FaUserSlash />
      </UserActionIcons>
    </UserBarStyle>
  );
}
