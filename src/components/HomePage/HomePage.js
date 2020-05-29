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
import firebaseConfig from '../../firebaseConfig';
import { firebaseController } from '../../App';

import { Redirect } from "react-router";
import { AuthContext } from '../../App';
import button from "../UI/Button/Button";
import GlobalStyle from "../GlobalStyles/GlobalStyles";

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
const HomePageBackground = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  height: 100vh;
  width: 100vw;
  background: #016789;
`;

const FriendsIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 2rem;
  padding-left: 5rem;
  font-size: 5rem;
  color: #fff;
  &:hover {
    color: green;
  }
`;

// const FriendsProfiles = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   position: absolute;

//   top: 0;
//   left: 0;
//   margin: auto;
//   padding-left: 5rem;
//   font-size: 5rem;
//   color: #fff;
// `;

const Navigation = styled.nav`
display: flex;
`

const RoomsIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
  padding-right: 5rem;
  font-size: 5rem;
  color: #fff;
`;

const HomeIcon = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 2rem;

  font-size: 5rem;
  color: #fff;
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

const HomePageSelectorContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  height: 85vh;
  width: 85vw;
  background: #0090c1;
`;

const HomePageChatContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 85vh;
  width: 70vw;
  background: #55d2fc;
`;

export default function HomePage() {
  let userAuth = useContext(AuthContext)
  let firebaseDoesNotExist, db
  // Check if firebase instance exists
  firebaseDoesNotExist = !firebase.apps.length
  if (firebaseDoesNotExist) {
    // Initialize Firebase
    db = firebase.initializeApp(firebaseConfig).firestore()
  } else {
    db = firebase.app().firestore()
  }
  if (!userAuth.loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div>

      <HomePageBackground>
        <FriendsIcon>
          <FaUserFriends />
        </FriendsIcon>
        {/* Implement friends component */}
        <HomeIcon>
          {/* Link to homepage */}
          <FaHome />
        </HomeIcon>
        <RoomsIcon>
          <FaRegComments />
        </RoomsIcon>
        <LogOutButton onClick={firebaseController.logout}>Log Out</LogOutButton>
        <HomePageSelectorContainer>
          <HomePageChatContainer>
            {/* Implement chat component here */}
          </HomePageChatContainer>
        </HomePageSelectorContainer>
      </HomePageBackground>
    </div>
  );
}
