import React from "react";

<<<<<<< HEAD
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

=======
import PropTypes from "prop-types";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

import Cabinet from "./FriendsCabinet/FriendsCabinet";
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
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
<<<<<<< HEAD
  justify-content: space-between;
=======
  justify-content: flex-start;
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  overflow: hidden;
  width: 100%;
  height: 100%;

<<<<<<< HEAD
  background-color: ${Theme.white};
=======
  background-color: ${Theme.backgroundColorLight};
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
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

<<<<<<< HEAD
const FriendsList = styled.div`
display: flex;
flex-direction: column;
height: 100%
overflow-y: scroll;
max-height: 90vh;
max-width: 20vw;

`;

const CloseButton = styled.button`
  align-self: flex-end;
`;

const FriendsContainer = styled.div`
  width: 91%;
  padding: 0.5rem 2px;
  margin: 0 auto;
  min-height: 1rem;
  text-align: center;
  border-radius: 15%;
`;

const FriendButton = styled.li`
  border-radius: 15%;
  margin: 0.5rem auto;
  background-image: ${(props) => (props.FriendPic ? props.FriendPic : "none")};
`;

const FavoriteFriends = styled.ul`
  width: 91%;
  padding: 0.5rem 2px;
  margin: 0 auto;
  min-height: 1rem;
  text-align: center;
  border-radius: 15%;
`;

const NoFavorites = styled.div`
  margin-top: 1rem;
  border-radius: 15%;
  font-size: 0.75rem;
`;

const GrayBG = styled.div`
  background-color: rgba(211, 211, 211, 0.35);
`;
const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  width: inherit;
  margin: 0 auto;
`;

const Stylishhr = styled.hr`
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  opacity: 0.75;
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
=======
const CloseButton = styled.button`
  align-self: flex-end;
  padding: 1px;
  transform: translateY(-5px);
  position: absolute;
  align-self: flex-start;
  z-index: 2;
  background-color: transparent;
  opacity: 0.7;
  border: none;
  border-radius: ${Theme.borderRadiusBtn};
  cursor: pointer;
  transition: ${Theme.transitionSpeed};
  &:hover {
    opacity: 1;
    transform: translateY(-6px);
  }
  &:active {
    opacity: 0.8;
    transform: translateY(1px);
  }
`;

const Whitespace = styled.div`
  margin-bottom: 5rem;
`;

FriendsTab.propTypes = {
  pageOnDisplay: PropTypes.string,
  favoriteFriends: PropTypes.oneOfType([PropTypes.array]),
};
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba

export default function FriendsTab({
  pageOnDisplay,
  favoriteFriends = null,
<<<<<<< HEAD
  Friends = null,
  logoutHandler,
  closeTabHandler,
}) {
  // Attach event listeners to these that take you to corresponding Friend
  let FriendButtons, favFriendButtons;
  if (favoriteFriends) {
    favFriendButtons = favoriteFriends.map((Friend) => (
      <FriendButton FriendPic={Friend.pic}>{Friend.name}</FriendButton>
    ));
  }
  if (Friends) {
    FriendButtons = favoriteFriends.map((Friend) => (
      <FriendButton FriendPic={Friend.pic}>{Friend.name}</FriendButton>
    ));
  }
=======
  friends = null,
  pendingFriends = null,
  sentFriendRequests = null,
  closeTabHandler,
  clientID,
  handleAccept,
  handleDecline,
  handleDeleteFriend,
  handleCancelFriendRequest,
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
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
  return (
    <FriendsTabStyle pageOnDisplay={pageOnDisplay}>
      <CloseButton onClick={closeTabHandler}>
        <img src={closeIcon} alt="close icon" />
      </CloseButton>
<<<<<<< HEAD
      <FriendsList>
        <SearchBar />
        <FavoriteFriends>
          <Label>Favorites</Label>
          <Stylishhr />
          <GrayBG>
            {favoriteFriends ? (
              favFriendButtons
            ) : (
              <NoFavorites>
                Add some Friends to your favorites to see them displayed here.
              </NoFavorites>
            )}
          </GrayBG>
        </FavoriteFriends>
        <FriendsContainer>
          <Stylishhr />
          <GrayBG>
            {Friends ? (
              FriendButtons
            ) : (
              <NoFavorites>
                Save some Friends to find them displayed here.
              </NoFavorites>
            )}
          </GrayBG>
        </FriendsContainer>
      </FriendsList>
      <LogOutButton onClick={() => logoutHandler()}>Log Out</LogOutButton>

=======
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
        handleCancelFriendRequest={handleCancelFriendRequest}
      />
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
      {/* <Toolbox /> */}
    </FriendsTabStyle>
  );
}
