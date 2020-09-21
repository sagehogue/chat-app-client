import React from "react";
import styled from "styled-components";

import UserBar from "./UserBar/UserBar";

// needs an icon, and some indicator that you can click this for a list of users

const DisplayBox = styled.section`
  margin: auto;
  min-height: 75vh;
  min-width: 50vw;
`;

const UserListHeading = styled.h3`
  margin-bottom: 0.5rem;
`;

const TopOfWindow = styled.div`
  margin: 1.25rem auto 0 auto;
  text-align: center;
`;

const UserListSearchInput = styled.input`
  padding: 0.25rem;
  margin-bottom: 0.5rem;
`;

const StyledHR = styled.hr`
  max-width: 30vw;
  opacity: 0.85;
  margin: 0 auto;
`;

const OnlineUsersList = styled.div`
  margin: 1rem 2rem;
`;

// users is users in current room, location is room name, friends is any friends the user might have,
// userID is the ID of the actual user in session
const UserList = ({
  users,
  location,
  friends = false,
  userID,
  handleAddFriend,
  handleRemoveFriend,
  addFavoriteHandler,
  removeFavoriteHandler,
}) => {
  console.log(users);
  let onlineUsers;
  // creates list of userbars from users prop
  if (users) {
    let isFriend = false;
    if (friends) {
      onlineUsers = users.map((user) => {
        console.log(`client user: ${userID}\n user in room: ${user.id}`);
        let profilePic = user.avatar || "default";
        if (user.id == userID) {
          return (
            <UserBar
              avatar={profilePic}
              username={user.displayName}
              friend={isFriend}
              id={userID}
              isUser
            />
          );
        } else {
          let i;
          for (i of friends) {
            if (i.id == user.id) isFriend = i.isFriend;
          }

          return (
            <UserBar
              avatar={profilePic}
              username={user.displayName}
              friend={isFriend}
              id={user.id}
              clientID={userID}
              addFriendHandler={handleAddFriend}
              removeFriendHandler={handleRemoveFriend}
            />
          );
        }
      });
    } else {
      onlineUsers = users.map((user) => {
        let profilePic = user.avatar || "default";
        if (user.id == userID) {
          return (
            <UserBar
              avatar={profilePic}
              username={user.displayName}
              friend={isFriend}
              id={userID}
              isUser
            />
          );
        } else {
          return (
            <UserBar
              avatar={profilePic}
              username={user.displayName}
              friend={isFriend}
              id={user.id}
              clientID={userID}
              addFriendHandler={handleAddFriend}
              removeFriendHandler={handleRemoveFriend}
            />
          );
        }
      });
    }
  }
  return (
    <DisplayBox>
      <TopOfWindow>
        <UserListHeading>Active Users in {location}</UserListHeading>
        <UserListSearchInput type="text" />
        <StyledHR />
      </TopOfWindow>
      <OnlineUsersList>{onlineUsers}</OnlineUsersList>
    </DisplayBox>
  );
};

export default UserList;
