import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

import Cabinet from "./FriendsCabinet/FriendsCabinet";
import closeIcon from "../../../icons/closeIcon.png";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
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

  background-color: ${Theme.white};
  transition: all ${Theme.navTransitionDuration} ease-in;
  transform: translateX(
    ${(props) =>
      props.pageOnDisplay === "friends" || props.pageOnDisplay === "initial"
        ? `0`
        : `-5rem`}
  );
  z-index: 2;

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
  align-self: flex-end;
`;

const LogOutButton = styled(button)`
  margin-top: auto;
  color: #fff;
  border: 1px #fff solid;
  background-color: black;
  margin: auto;
  margin-top: 2rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const AddFriendButton = styled(button)`
  background-color: lightblue;
  color: white;
  margin: 0.5rem auto 0.5rem auto;
  margin-top: 0.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const RemoveFriendButton = styled(button)`
  background-color: red;
  color: white;
  color: #fff;
  margin: 0.5rem auto 0.5rem auto;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const Whitespace = styled.div`
  margin-bottom: 5rem;
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
      <CloseButton onClick={closeTabHandler}>
        <img src={closeIcon} alt="close icon" />
      </CloseButton>
      <SearchBar />
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
      />
      {/* <Toolbox /> */}
    </FriendsTabStyle>
  );
}
