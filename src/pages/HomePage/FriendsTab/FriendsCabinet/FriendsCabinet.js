import React from "react";
import styled from "styled-components";

import Drawer from "./Drawer/Drawer.js";
import UserBar from "../../../../components/UI/UserSystem/UserBar/UserBar";
import FriendRequest from "../../../../components/UI/UserSystem/FriendRequest/FriendRequest";

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
  handleAccept,
  handleDecline,
  deleteFriend,
  removeFavorite,
  addFavorite,
  clientID,
  openDMHandler,
  handleCancelFriendRequest,
}) {
  console.log(
    `Friends:${JSON.stringify(
      friends
    )}\npendingFriendRequests: ${JSON.stringify(
      pendingFriends
    )}\nsentFriendRequests: ${JSON.stringify(sentFriendRequests)}`
  );
  // Attach event listeners to these that take you to corresponding Friend
  let FriendButtons, favFriendButtons, sentFriendRequestButtons;
  if (favoriteFriends) {
    favFriendButtons = favoriteFriends.map((Friend) => (
      <UserBar
        displayName={Friend.displayName}
        clientID={clientID}
        id={Friend.id}
        deleteHandler={deleteFriend}
        dmHandler={openDMHandler}
      ></UserBar>
    ));
  }
  if (friends) {
    FriendButtons = friends.map((Friend) => (
      <UserBar
        displayName={Friend.displayName}
        clientID={clientID}
        id={Friend.id}
        deleteHandler={deleteFriend}
        dmHandler={openDMHandler}
      ></UserBar>
    ));
  }
  let friendRequests;
  if (pendingFriends) {
    friendRequests = pendingFriends.map((Friend) => (
      <FriendRequest
        displayName={Friend.displayName}
        clientID={clientID}
        requesterID={Friend.uid}
        handleAccept={handleAccept}
        handleDecline={handleDecline}
      >
        {Friend.displayName}
      </FriendRequest>
    ));
  }
  if (sentFriendRequests) {
    sentFriendRequestButtons = sentFriendRequests.map((Friend) => (
      <UserBar
        displayName={Friend.displayName}
        clientID={clientID}
        id={Friend.id}
        type="SENTREQUEST"
        handleCancelFriendRequest={handleCancelFriendRequest}
      ></UserBar>
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
        {friends ? (
          FriendButtons
        ) : (
          <NoFavorites>
            Save some Friends to find them displayed here.
          </NoFavorites>
        )}
      </FriendsDrawer>
      <RequestDrawer name={"Requests"}>{friendRequests}</RequestDrawer>
      <SentRequestDrawer name={"Sent"}>
        {sentFriendRequests ? sentFriendRequestButtons : null}
      </SentRequestDrawer>
    </DrawerFrame>
  );
}
