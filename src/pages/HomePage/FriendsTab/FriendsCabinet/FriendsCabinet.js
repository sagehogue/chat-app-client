import React from "react";
import styled from "styled-components";

import Drawer from "./Drawer/Drawer.js";

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

const FriendsContainer = styled.div`
  width: 91%;
  padding: 0.5rem 2px;
  margin: 0 auto;
  min-height: 1rem;
  text-align: center;
  border-radius: 15%;
`;

const DrawerFrame = styled.div`
display: flex;
flex-direction: column;
height: 100%
overflow-y: scroll;
max-height: 90vh;
max-width: 20vw;

`;

const FavoritesDrawer = styled(Drawer)``;

const FriendsDrawer = styled(Drawer)``;

const RequestDrawer = styled(Drawer)``;

const SentRequestDrawer = styled(Drawer)``;

const FriendButton = styled.li`
  border-radius: 15%;
  margin: 0.5rem auto;
  padding: 2rem;
  background-color: grey;
  background-image: ${(props) => (props.FriendPic ? props.FriendPic : "none")};
`;

export default function FriendsCabinet({
  favoriteFriends = null,
  friends = null,
  pendingFriends = null,
  sentFriendRequests = null,
}) {
  console.log(`FRIENDS! ` + friends + pendingFriends + sentFriendRequests);
  // Attach event listeners to these that take you to corresponding Friend
  let FriendButtons,
    favFriendButtons,
    pendingFriendButtons,
    sentFriendRequestButtons;
  if (favoriteFriends) {
    favFriendButtons = favoriteFriends.map((Friend) => (
      <FriendButton>{Friend.displayName}</FriendButton>
    ));
  }
  if (friends) {
    FriendButtons = friends.map((Friend) => (
      <FriendButton>{Friend.displayName}</FriendButton>
    ));
  }
  if (pendingFriends) {
    pendingFriendButtons = pendingFriends.map((Friend) => (
      <FriendButton>{Friend.displayName}</FriendButton>
    ));
  }
  if (sentFriendRequests) {
    sentFriendRequestButtons = sentFriendRequests.map((Friend) => (
      <FriendButton>{Friend.displayName}</FriendButton>
    ));
  }
  return (
    <DrawerFrame>
      <FavoritesDrawer name={"Favorites"}>
        {/* {favoriteFriends ? (
            favFriendButtons
          ) : (
            <NoFavorites>
              Adding friends to your favorites will pin them here.
            </NoFavorites>
          )} */}
      </FavoritesDrawer>
      <FriendsDrawer name={"Friends"}>
        {/* {friends ? (
            FriendButtons
          ) : (
            <NoFavorites>
              Save some Friends to find them displayed here.
            </NoFavorites>
          )} */}
      </FriendsDrawer>
      <RequestDrawer name={"Requests"}>
        {/* {pendingFriends ? (
            pendingFriendButtons
          ) : (
            <NoFavorites>
              Save some Friends to find them displayed here.
            </NoFavorites>
          )} */}
      </RequestDrawer>
      <SentRequestDrawer name={"Sent"}>
        {/* {sentFriendRequests ? (
            sentFriendRequestButtons
          ) : (
            <NoFavorites>
              Save some Friends to find them displayed here.
            </NoFavorites>
          )} */}
      </SentRequestDrawer>
    </DrawerFrame>
  );
}
