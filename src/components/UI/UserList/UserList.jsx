import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Theme from "../../../util/Theme/Theme";
import UserBar from "./UserBar/UserBar";

import { Modal } from "../Modal/NewModal";

// needs an icon, and some indicator that you can click this for a list of users

const UserListHeading = styled.h3`
  margin-bottom: 0.5rem;
  color: ${Theme.offWhite};
`;

const TopOfWindow = styled.div`
  margin: 1.25rem auto 0 auto;
  text-align: center;
`;

const UserListSearchInput = styled.input`
  padding: 0.25rem;
  margin-bottom: 0.5rem;
  border: none;

  &hover{
    border: none;
  }
`;

const StyledHR = styled.hr`
  max-width: 30vw;
  opacity: 0.85;
  margin: 0 auto;
`;

const OnlineUsersList = styled.div`
  margin: 1rem 2rem;
`;

const UserListModal = styled(Modal)`
  width: 20vw;
  height: 30vh;
  padding: 1rem;
  display: ${(props) => (props.shouldDisplay ? "flex" : "none")};
  position: absolute;
  // top: auto;
  // bottom: auto;
  // left: auto;
  // right: auto;
  // min-width: 35vw;
  // min-height: 60vh;
  height: ${Theme.ui.modalHeight};
  width: ${Theme.ui.modalWidth};
  background-color: ${Theme.theme3.color2};
  flex-direction: column !important;
`;
// users is users in current room, location is room name, friends is any friends the user might have,
// userID is the ID of the actual user in session
const UserList = ({
  users = [],
  location,
  friends = [],
  userID,
  handleAddFriend,
  handleRemoveFriend,
  addFavoriteHandler,
  removeFavoriteHandler,
  shouldDisplay,
}) => {
  let isFriend = false;
  let userJsx;

  const generateJSX = (results) => {
    console.log(results)
    let JSX;
    JSX = results.map((result) => {
      let profilePic = result.avatar || "default";
      // case "user profile belongs to client"
      if (result.id == userID) {
        return (
          <UserBar
            avatar={profilePic}
            username={result.displayName}
            friend={isFriend}
            id={userID}
            isUser
          />
        );
      } else {
        let i;
        for (i of friends) {
          if (i.id == result.id) isFriend = i.isFriend;
        }

        return (
          <UserBar
            avatar={profilePic}
            username={result.displayName}
            friend={isFriend}
            id={result.id}
            clientID={userID}
            addFriendHandler={handleAddFriend}
            removeFriendHandler={handleRemoveFriend}
          />
        );
      }
    });
    return JSX;
  };
  const [userSearchTerm, setUserSearchTerm] = useState("");
  console.log(users)
  const [userBars, setUserBars] = useState(generateJSX(users));
  const handleChange = (e) => {
    console.log(e.target.value);
    setUserSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (userSearchTerm === "") {
      // Set results to be all users
      return setUserBars(generateJSX(users));
    } else {
      const results = users.filter((user) => {
        return user.displayName
          .toLowerCase()
          .includes(userSearchTerm.toLowerCase());
      });
      console.log(results);
      const userJsx = generateJSX(results);
      setUserBars(userJsx);
    }
  }, [userSearchTerm, users]);

 




// 1) Get hook to socket - done
// 2) Get a list of users - done
// 3) Send to backend - done
// 4) Get avatars from users - done
// 5) Return to FE and re-render




  return (
    <UserListModal shouldDisplay={shouldDisplay}>
      <TopOfWindow>
        <UserListHeading>Active Users in {location}</UserListHeading>
        <UserListSearchInput type="text" onChange={handleChange} />
        <StyledHR />
      </TopOfWindow>
      <OnlineUsersList>{userBars}</OnlineUsersList>
    </UserListModal>
  );
};

export default UserList;
