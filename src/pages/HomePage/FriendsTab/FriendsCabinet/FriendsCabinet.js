import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Cabinet from "../../../../components/UI/Cabinet/Cabinet";
import Drawer from "../../../../components/UI/Cabinet/Drawer";
import UserBar from "../../../../components/UI/UserSystem/UserBar/UserBar";
import FriendRequest from "../../../../components/UI/UserSystem/FriendRequest/FriendRequest";

const NoFavorites = styled.div`
  margin-top: 1rem;
  border-radius: 15%;
  font-size: 0.75rem;
`;

const FavoritesDrawer = styled(Drawer)``;

const FriendsDrawer = styled(Drawer)``;

const RequestDrawer = styled(Drawer)``;

const SentRequestDrawer = styled(Drawer)``;

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

  const [favoriteFriendsUserbars, setFavoriteFriendsUserbars] = useState([]);
  const [friendsUserbars, setFriendsUserbars] = useState([]);
  const [friendRequestUserbars, setFriendRequestUserbars] = useState([]);
  const [sentFriendRequestUserbars, setSentFriendRequestUserbars] = useState(
    []
  );

  // Attach event listeners to these that take you to corresponding Friend
  let FriendBars, friendRequestBars, favFriendBars, sentFriendRequestBars;
  useEffect(() => {
    if (favoriteFriends) {
      setFavoriteFriendsUserbars(
        favoriteFriends.map((Friend) => (
          <UserBar
            displayName={Friend.displayName}
            clientID={clientID}
            id={Friend.id}
            deleteHandler={deleteFriend}
            deleteSelfHandler={console.log("")}
            dmHandler={openDMHandler}
            key={Friend.id}
            avatar={Friend.avatar}
          ></UserBar>
        ))
      );
    }
  }, [favoriteFriends]);

  useEffect(() => {
    if (friends) {
      setFriendsUserbars(
        friends.map((Friend) => (
          <UserBar
            displayName={Friend.displayName}
            clientID={clientID}
            id={Friend.id}
            deleteHandler={deleteFriend}
            dmHandler={openDMHandler}
            avatar={Friend.avatar}
            key={Friend.id}
            deleteSelf={() => {
              let newFriends = friendsUserbars.filter(
                (userbar) => userbar.key !== Friend.id
              );
              setFriendsUserbars(newFriends);
            }}
          ></UserBar>
        ))
      );
    }
  }, [friends]);

  useEffect(() => {
    if (pendingFriends) {
      setFriendRequestUserbars(
        pendingFriends.map((Friend) => (
          <FriendRequest
            displayName={Friend.displayName}
            clientID={clientID}
            avatar={Friend.avatar}
            requesterID={Friend.id}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            key={Friend.id}
            deleteSelf={() => {
              let newUserBars = friendRequestUserbars.filter(
                (userbar) => userbar.key !== Friend.id
              );
              setFriendRequestUserbars(newUserBars);
            }}
          >
            {Friend.displayName}
          </FriendRequest>
        ))
      );
    }
  }, [pendingFriends]);

  useEffect(() => {
    if (sentFriendRequests) {
      setSentFriendRequestUserbars(
        sentFriendRequests.map((Friend) => (
          <UserBar
            displayName={Friend.displayName}
            avatar={Friend.avatar}
            key={Friend.id}
            clientID={clientID}
            id={Friend.id}
            type="SENTREQUEST"
            handleCancelFriendRequest={handleCancelFriendRequest}
            deleteSelf={() => {
              let newSentFriendRequests = sentFriendRequestUserbars.filter(
                (userbar) => userbar.key !== Friend.id
              );
              setSentFriendRequestUserbars(newSentFriendRequests);
            }}
          ></UserBar>
        ))
      );
      // setSentFriendRequestUserbars(sentFriendRequestBars);
    }
  }, [sentFriendRequests]);

  return (
    <Cabinet>
      <FavoritesDrawer name={"Favorites"}>
        {favoriteFriends ? (
          favoriteFriendsUserbars
        ) : (
          <NoFavorites>
            Adding friends to your favorites will pin them here.
          </NoFavorites>
        )}
      </FavoritesDrawer>
      <FriendsDrawer name={"Friends"}>
        {friends ? (
          friendsUserbars
        ) : (
          <NoFavorites>
            Save some Friends to find them displayed here.
          </NoFavorites>
        )}
      </FriendsDrawer>
      <RequestDrawer name={"Requests"}>{friendRequestUserbars}</RequestDrawer>
      <SentRequestDrawer name={"Sent"}>
        {sentFriendRequestUserbars}
      </SentRequestDrawer>
    </Cabinet>
  );
}
