import React from "react";
import styled from "styled-components";
import Theme from "../../../../util/Theme/Theme";

import Thumbnail from '../../Thumbnail/Thumbnail';

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
  transition: all 0.2s;
  border: solid 2px ${Theme.theme3.color2AccentB};
  text-align: center;
  align-items: center;
  color: ${Theme.offWhite};
  &:hover {
    border: solid 2px ${Theme.theme3.highlight2};
  }
`;

const Username = styled.span`
  color: ${Theme.offWhite};
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
  avatar=false,
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
  console.log(avatar)
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
const ThumbnailPlaceholder = (<UserAvatar>
  <FaUserSecret />
</UserAvatar>)

  let clientUserBar = (
    <UserBarStyle>
      {avatar && avatar != "default" ? <Thumbnail imageURL={avatar.url}/> : ThumbnailPlaceholder}
      <Username>{username}</Username>
      <UserActionIcons></UserActionIcons>
    </UserBarStyle>
  );
  return isUser ? (
    clientUserBar
  ) : (
    <UserBarStyle>
      {avatar && avatar != "default" ? <Thumbnail imageURL={avatar.url}/>: ThumbnailPlaceholder}
      <Username>{username}</Username>
      <UserActionIcons>
        <FaEnvelope />
        {friendOperation}
        <FaUserSlash />
      </UserActionIcons>
    </UserBarStyle>
  );
}
