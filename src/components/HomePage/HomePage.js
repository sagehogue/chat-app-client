<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaRegComments,
  FaHome,
  FaPortrait
} from "react-icons/fa";
=======
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
>>>>>>> 87298f7176a4b352441bf9995078e2486b6f7abc
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
// Implement loading screen while authentication happens (if it looks like the background of the login screen it'll look subtle), redirect.

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
            <GlobalStyle />

<<<<<<< HEAD
      <HomePageBackground>
        <FriendsIcon>
          <FaUserFriends />
        </FriendsIcon>
        {/* <FriendsProfiles>
          <FaPortrait />
          <FaPortrait />
          <FaPortrait />
          <FaPortrait />
          <FaPortrait />
        </FriendsProfiles> */}
        <HomeIcon>
          <FaHome />
        </HomeIcon>
        <RoomsIcon>
          <FaRegComments />
        </RoomsIcon>
        <LogOutButton onClick={handleLogOut}>Log Out</LogOutButton>
        <HomePageSelectorContainer>
          <HomePageChatContainer></HomePageChatContainer>
        </HomePageSelectorContainer>
      </HomePageBackground>
    </div>
  );
=======
            <HomePageBackground>
                <LogOutButton onClick={firebaseController.logout}>Log Out</LogOutButton>
                <HomePageSelectorContainer>
                    <HomePageChatContainer></HomePageChatContainer>
                </HomePageSelectorContainer>
            </HomePageBackground>
        </div>
    );
>>>>>>> 87298f7176a4b352441bf9995078e2486b6f7abc
}
