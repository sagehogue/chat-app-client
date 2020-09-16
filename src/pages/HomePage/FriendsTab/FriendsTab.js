import React from "react";

import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

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
  justify-content: space-between;
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  overflow: hidden;
  width: 100%;
  height: 100%;

  background-color: rgba(154, 169, 213, 1);
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

const FriendsList = styled.div`
display: flex;
flex-direction: column;
height: 100%
overflow-y: scroll;
max-height: 90vh;
max-width: 20vw;


`;
//made cursor pointer
const CloseButton = styled.button`
  align-self: flex-end;
  cursor: pointer;
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

export default function FriendsTab({
  pageOnDisplay,
  favoriteFriends = null,
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
  return (
    <FriendsTabStyle pageOnDisplay={pageOnDisplay}>
      <CloseButton onClick={closeTabHandler}>
        <img src={closeIcon} alt="close icon" />
      </CloseButton>
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

      {/* <Toolbox /> */}
    </FriendsTabStyle>
  );
}
