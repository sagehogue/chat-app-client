import React from "react";

import { FaPlusCircle, FaTimes, FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";

import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

import Cabinet from "./FriendsCabinet/FriendsCabinet";
import closeIcon from "../../../icons/closeIcon.png";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import UserSearchBar from "../../../components/UI/SearchBar/UserSearchBar/UserSearchBar.jsx";
import button from "../../../components/UI/Button/Button";

export const oldFriendsTab = styled.section``;
// import Toolbox from './Toolbox/Toolbox'

/* TODOS:
Write functionality to enable drop down menu of search results for a given Friend name. 
Maybe look for some kind of package that can handle pagination
*/

const FriendsTabStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  overflow: hidden;
  width: 100%;
  height: 100%;

  background-color: ${Theme.backgroundColorDark};
  transition: all ${Theme.navTransitionDuration} ease-in;
  transform: translateX(
    ${(props) =>
      props.pageOnDisplay === "friends" || props.pageOnDisplay === "initial"
        ? `0`
        : `-5rem`}
  );
  z-index: ${Theme.zIndex.tabs};

  @media screen and (min-width: 400px) {
    transform: translateX(
      ${(props) =>
        props.pageOnDisplay === "friends" || props.pageOnDisplay === "initial"
          ? `0`
          : `-10rem`}
    );
  }
  @media screen and (min-width: 800px) {
    transform: translateX(
      ${(props) =>
        props.pageOnDisplay === "friends" || props.pageOnDisplay === "initial"
          ? `0`
          : `-15rem`}
    );
    padding: 1rem;
  }
  @media screen and (min-width: 1200px) {
    transform: translateX(
      ${(props) =>
        props.pageOnDisplay === "friends" || props.pageOnDisplay === "initial"
          ? `0`
          : `-20rem`}
    );
    padding: 2rem;
  }
  @media screen and (min-width: 1600px) {
    transform: translateX(
      ${(props) =>
        props.pageOnDisplay === "friends" || props.pageOnDisplay === "initial"
          ? `0`
          : `-25rem`}
    );
    padding: 2rem;
  }
`;

const CloseButton = styled.button`
  padding: 1px;
  transform: translateY(-5px);
  // position: absolute;
  align-self: flex-end;
  z-index: 2;
  background-color: transparent;
  opacity: 0.7;
  border: none;
  border-radius: ${Theme.borderRadiusBtn};
  cursor: pointer;
  transition: ${Theme.transitionSpeed};
  vertical-align: middle;
  &:hover {
    opacity: 1;
    transform: translateY(-6px);
  }
  &:active {
    opacity: 0.8;
    transform: translateY(1px);
  }
`;

const TopButtons = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const ButtonEffects = styled.div`
transition: all 0.1s;
// margin-bottom: 4rem;
border-radius: 50%;
cursor: pointer;


&:hover {
  
  opacity: 1;
  scale: 1.075;
  background: radial-gradient(circle farthest-side, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2));
background-repeat: no-repeat;

  box-shadow: 0 0 8px 5px rgba(255, 255, 255, 0.2),
  0 0 10px 3px rgba(255, 0, 255, 0.15),
  0 0 14px 6px rgba(0, 255, 255, 0.15),
  0 0 100px 100px rgba(255, 255, 255, 0.1) inset;

  // box-shadow: 0 0 60px 3px #fff, /* inner white */ 0 0 100px 6px #f0f,
  //   /* middle magenta */ 0 0 140px 9px #0ff;
}
&:active {
  opacity: 0.8;
  transform: translateY(2px);
}
`

const Whitespace = styled.div`
  margin-bottom: 2.5rem;
`;

FriendsTab.propTypes = {
  pageOnDisplay: PropTypes.string,
  favoriteFriends: PropTypes.oneOfType([PropTypes.array]),
};

export default function FriendsTab({
  pageOnDisplay,
  favoriteFriends = null,
  friends = null,
  pendingFriends = null,
  sentFriendRequests = null,
  closeTabHandler,
  clientID,
  handleAccept,
  handleDecline,
  handleDeleteFriend,
  handleCancelFriendRequest,
  openUserSearchHandler,
}) {
  const deleteFriendHandler = (uid, friendUID) => {
    // later I should allow multiple deletes with one confirmation
    // display them all when selected
    const confirmation = window.confirm(
      "Are you sure you want to delete this user from your friends list?"
    );
    if (confirmation) {
      handleDeleteFriend(uid, friendUID);
    }
  };
  return (
    <FriendsTabStyle pageOnDisplay={pageOnDisplay}>
      <TopButtons>
        <ButtonEffects><FaSearch size={25} onClick={openUserSearchHandler} /></ButtonEffects>
        <ButtonEffects><FaTimes size={25} onClick={closeTabHandler} /></ButtonEffects>
        
      </TopButtons>
      <Whitespace />
      <Cabinet
        favoriteFriends={favoriteFriends}
        friends={friends}
        pendingFriends={pendingFriends}
        sentFriendRequests={sentFriendRequests}
        clientID={clientID}
        handleAccept={handleAccept}
        handleDecline={handleDecline}
        deleteFriend={deleteFriendHandler}
        handleCancelFriendRequest={handleCancelFriendRequest}
      />
      {/* <Toolbox /> */}
    </FriendsTabStyle>
  );
}
