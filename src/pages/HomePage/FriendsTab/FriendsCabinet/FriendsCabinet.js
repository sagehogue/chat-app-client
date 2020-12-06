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

const FriendsAvatar = styled.img`
  height: 10px;
  width: 10px;
`;

export default function FriendsCabinet({
  friends = [],
  handleAccept,
  handleDecline,
  deleteFriend,
  removeFavorite,
  addFavorite,
  clientID,
  openDMHandler,
  handleCancelFriendRequest,
  sentRequests = [],
  pendingFriends = [],
  favoriteFriendsList = [],
}) {
  const [favoriteFriends, setFavoriteFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

  useEffect(() => {
    console.log(friends);
    let favorites = [],
      sent = [],
      requests = [],
      friendsList = [];
    // mapping through all friends to identify what kind of JSX they need
    friends.map((friend) => {
      console.log(friend);
      if (friend.isFriend) {
        console.log("FRIEND.isFRIEND");
        if (friend.isFavorite) {
          console.log("FRIEND.isFav");
          // case: is a favorite friend
          favorites.push(friend);
        } else if (friend.isFriend === "sent") {
          // case: sent friend request
          sent.push(friend);
        } else if (friend.isFriend === "pending") {
          // case: received friend request
          requests.push(friend);
        } else if (friend.isFriend === true) {
          console.log("PUSH TO FIREND LIUST");
          // case: is a friend
          friendsList.push(friend);
        }
      }
    });
    if (favorites && favorites != favoriteFriends) {
      setFavoriteFriends(favorites);
    }
    if (sent && sent != sentFriendRequests) {
      setSentFriendRequests(sent);
    }
    if (requests && requests != friendRequests) {
      setFriendRequests(requests);
    }
    if (friendsList) {
      console.log("WE HAVE FRIENDS LIST");
      if (friendsList !== filteredFriends) {
        console.log("AND IT DOES NOT MATCH THE OLD FRIENDS");
        console.log(friendsList);
        console.log(filteredFriends);
      }
    }
    if (friendsList && friendsList !== filteredFriends) {
      setFilteredFriends(friendsList);
    }
  }, [friends]);
  console.log(filteredFriends);
  // Attach event listeners to these that take you to corresponding Friend
  let FriendBars, friendRequestBars, favFriendBars, sentFriendRequestBars;
  // useEffect(() => {
  //   if (favoriteFriends) {
  //     setFavoriteFriendsUserbars(

  //     );
  //   }
  // }, [favoriteFriends]);

  // useEffect(() => {
  //   if (friends) {
  //     setFriendsUserbars(

  //     );
  //   }
  // }, [friends]);

  // useEffect(() => {
  //   if (pendingFriends) {
  //     setFriendRequestUserbars(

  //     );
  //   }
  // }, [pendingFriends]);

  // useEffect(() => {
  //   if (sentFriendRequests) {
  //     setSentFriendRequestUserbars(

  //     );
  //     // setSentFriendRequestUserbars(sentFriendRequestBars);
  //   }
  // }, [sentFriendRequests]);

  return (
    <Cabinet>
      <FavoritesDrawer name={"Favorites"}>
        {favoriteFriends ? (
          favoriteFriends.map((Friend) => (
            <UserBar
              displayName={Friend.displayName}
              clientID={clientID}
              id={Friend.id}
              deleteHandler={deleteFriend}
              // deleteSelfHandler={console.log("")}
              dmHandler={openDMHandler}
              addFavoriteHandler={addFavorite}
              removeFavoriteHandler={removeFavorite}
              key={Friend.id}
              avatar={Friend.avatar}
              isFavorite
            ></UserBar>
          ))
        ) : (
          <NoFavorites>
            Adding friends to your favorites will pin them here.
          </NoFavorites>
        )}
      </FavoritesDrawer>
      <FriendsDrawer name={"Friends"}>
        {friends ? (
          filteredFriends.map((Friend) => (
            <UserBar
              displayName={Friend.displayName}
              addFavoriteHandler={addFavorite}
              removeFavoriteHandler={removeFavorite}
              clientID={clientID}
              id={Friend.id}
              deleteHandler={deleteFriend}
              dmHandler={openDMHandler}
              avatar={Friend.avatar}
              key={Friend.id}
              deleteSelf={() => {
                let newFriends = filteredFriends.filter(
                  (userbar) => userbar.key !== Friend.id
                );
                setFilteredFriends(newFriends);
              }}
            ></UserBar>
          ))
        ) : (
          <NoFavorites>
            Save some Friends to find them displayed here.
          </NoFavorites>
        )}
      </FriendsDrawer>
      <RequestDrawer name={"Requests"}>
        {friendRequests.map((Friend) => (
          <FriendRequest
            displayName={Friend.displayName}
            clientID={clientID}
            avatar={Friend.avatar}
            requesterID={Friend.id}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            key={Friend.id}
            deleteSelf={() => {
              let newUserBars = friendRequests.filter(
                (userbar) => userbar.key !== Friend.id
              );
              setFriendRequests(newUserBars);
            }}
          >
            {Friend.displayName}
          </FriendRequest>
        ))}
      </RequestDrawer>
      <SentRequestDrawer name={"Sent"}>
        {sentFriendRequests.map((Friend) => (
          <UserBar
            displayName={Friend.displayName}
            avatar={Friend.avatar}
            key={Friend.id}
            clientID={clientID}
            id={Friend.id}
            type="SENTREQUEST"
            handleCancelFriendRequest={handleCancelFriendRequest}
            deleteSelf={() => {
              let newSentFriendRequests = sentFriendRequests.filter(
                (userbar) => userbar.key !== Friend.id
              );
              setSentFriendRequests(newSentFriendRequests);
            }}
          ></UserBar>
        ))}
      </SentRequestDrawer>
    </Cabinet>
  );
}
