import React from "react";
import styled from "styled-components";

import { FaUserFriends, FaRegComments, FaHome } from "react-icons/fa";

import Theme from "../../util/Theme/Theme";
import CurrentUserProfile from "../../components/Profile/CurrentUserProfile";

const Nav = styled.nav`
  font-size: ${Theme.fontSizeL};
  display: flex;
  height: 10vh;
  justify-content: space-between;
  grid-row: ${Theme.layout.gridRowNav};
  grid-column: ${Theme.layout.gridColNav};
  z-index: ${Theme.zIndex.nav};
  //   padding-top: 1rem;
  // color: rgba(255, 255, 255, 0.9);
  color: ${Theme.theme3.color3};
  vertical-align: middle;
  & svg {
    transition: all ${Theme.navTransitionDuration};
    height: inherit;
  }
  & svg:first-child {
    margin-left: 1rem;
    cursor: pointer;
  }
  & svg:last-child {
    margin-right: 1rem;
    cursor: pointer;
  }
  @media screen and (min-width: 1600px) {
    font-size: 2.5rem;
  }
`;

const HomeAndUser = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  transform: translateX(-2rem);
  align-items: center;
`;

const UserNameDisplay = styled.span`
  font-size: ${Theme.fontSizeL};
  padding-left: 1rem;
  z-index: 1;
  vertical-align: middle;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */

  /* Rules below not implemented in browsers yet */
  -o-user-select: none;
  user-select: none;
`;

export default function Navigation({
  pageOnDisplay,
  handleDisplayFriendsTab,
  handleDisplayRooms,
  handleRevertDefault,
  handleDisplayProfile,
  user,
  socket,
  firebaseController,
  avatar,
  displayProfile,
  closeProfileHandler,
}) {
  let name,
    email,
    photoURL,
    uid = { user };
  return (
    <Nav pageOnDisplay={pageOnDisplay}>
      <FaUserFriends onClick={handleDisplayFriendsTab} />
      <HomeAndUser>
        <FaHome onClick={handleRevertDefault} /> {/* Link to homepage */}
        <UserNameDisplay
          onClick={() => {
            if (displayProfile) {
              closeProfileHandler();
            } else {
              handleDisplayProfile();
            }
          }}
        >
          {user.displayName}
        </UserNameDisplay>
        <CurrentUserProfile
          id={uid}
          socket={socket}
          profileDisplayState={displayProfile}
          handleCloseProfile={closeProfileHandler}
          logoutHandler={firebaseController.logout}
          user={user}
          profilePicURL={avatar.url}
        ></CurrentUserProfile>
      </HomeAndUser>
      <FaRegComments onClick={handleDisplayRooms} />
    </Nav>
  );
}
