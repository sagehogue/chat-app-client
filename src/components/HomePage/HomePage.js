import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import {
  FaUserFriends,
  FaRegComments,
  FaHome,
  FaPortrait
} from "react-icons/fa";
import styled from "styled-components";
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import { firebaseController } from "../../App";

import { Redirect } from "react-router";
import { AuthContext } from "../../App";
import button from "../UI/Button/Button";
import Theme from "../UI/Theme/Theme";
import GlobalStyle from "../UI/GlobalStyles/GlobalStyles";

// TODO
// Implement a method to display only one side menu at a time.
// Display a user greeting somewhere
// Fix following issue: When page is loaded directly from url bar and not from login page, it redirects to login even if immediately authenticated.
// adjust proportions of menus - they take up too much space.
// Integrate chat component.

/* Description of implementation of this component:

3 states
1.) display no side bars, only main conversation
2.) show left sidebar
3.) show right sidebar

We should seek to adjust the whitespace around the main component so it never shifts the content. I'm thinking a system like this will work:
<main>
  <leftsidebar />
    <content-wrapper>
      <chat />
    </content-wrapper>
  <rightsidebar />
</main>

the main will be a grid. the main will have state that controls the display, and the grid css will correspond to the state to render the screen how we want.
i.e. in state 1 content-wrapper will span the whole grid, in state 2 it'll span the right 3/4 of the screen, in state 3 it'll span the left 3/4 of the screen.
*/

const HomePageGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  grid-template-rows: repeat(10, 1fr);
  height: 100vh;
  width: 100vw;
  background: #016789;
`;

const Navigation = styled.nav`
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  grid-row: 1 / 2;
  width: 100%;
  grid-column: 1 / -1;
  padding-top: 1rem;
  color: rgba(255, 255, 255, 0.9);
  & svg {
    transition: all ${Theme.navTransitionDuration};
  }
  & svg:first-child {
    margin-left: 1rem;
    color: ${props =>
    props.pageOnDisplay == "friends"
      ? `${Theme.navColorActive}`
      : `${Theme.navColorInactive}`};
  }
  & svg:last-child {
    margin-right: 1rem;
    color: ${props =>
    props.pageOnDisplay == "rooms"
      ? `${Theme.navColorActive}`
      : `${Theme.navColorInactive}`};
  }
`;

const FriendsTab = styled.section`
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  transition: all ${Theme.navTransitionDuration} ease-in-out;
  transform: translateX(
    ${props => (props.pageOnDisplay == "friends" ? `0` : `-5rem`)}
  );
`;

const RoomTab = styled.section`
  grid-row: 1 / -1;
  grid-column: 3 / 4;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  transition: all ${Theme.navTransitionDuration} ease-in;
  transform: translateX(
    ${props => (props.pageOnDisplay == "rooms" ? `0` : `5rem`)}
  );
`;

const LogOutButton = styled(button)`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 3rem;
  margin-right: 30rem;

  color: #fff;
  border: 1px #fff solid;
  background-color: transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default function HomePage() {
  let [display, setDisplay] = useState("initial");
  let userAuth = useContext(AuthContext);
  let firebaseDoesNotExist, db;
  // Check if firebase instance exists
  firebaseDoesNotExist = !firebase.apps.length;
  if (firebaseDoesNotExist) {
    // Initialize Firebase
    db = firebase.initializeApp(firebaseConfig).firestore();
  } else {
    db = firebase.app().firestore();
  }
  if (!userAuth.loggedIn) {
    return <Redirect to="/login" />;
  }

  const handleDisplayFriends = () => {
    setDisplay("friends");
  };
  const handleDisplayRooms = () => {
    setDisplay("rooms");
  };
  const handleRevertDefault = () => {
    setDisplay("initial");
  };

  return (
    <HomePageGrid>
      <GlobalStyle />
      <Navigation pageOnDisplay={display}>
        <FaUserFriends onClick={handleDisplayFriends} />
        <FaHome onClick={handleRevertDefault} /> {/* Link to homepage */}
        <FaRegComments onClick={handleDisplayRooms} />
      </Navigation>
      <FriendsTab pageOnDisplay={display}></FriendsTab>
      {/* Implement friends component */}
      {/* Implement Chat component */}
      <LogOutButton onClick={firebaseController.logout}>Log Out</LogOutButton>
      {/* Implement room component */}
      <RoomTab pageOnDisplay={display}></RoomTab>
    </HomePageGrid>
  );
}
