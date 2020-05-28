import React, { useState, useEffect } from "react";
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

import { Redirect } from "react-router";

import button from "../UI/Button/Button";
import GlobalStyle from "../GlobalStyles/GlobalStyles";

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
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCGGPrP9z87mezp2ctPzDMHSVdO-Sl2c3c",
      authDomain: "chat-app-c2d82.firebaseapp.com",
      databaseURL: "https://chat-app-c2d82.firebaseio.com",
      projectId: "chat-app-c2d82",
      storageBucket: "chat-app-c2d82.appspot.com",
      messagingSenderId: "773697802163",
      appId: "1:773697802163:web:e7627c57705dd86ebd45c6",
      measurementId: "G-VHVQ28NBE7"
    };
    let firebaseDoesNotExist, db;
    // Check if firebase instance exists
    firebaseDoesNotExist = !firebase.apps.length;
    if (firebaseDoesNotExist) {
      // Initialize Firebase
      db = firebase.initializeApp(firebaseConfig).firestore();
    } else {
      db = firebase.app().firestore();
    }
    // Event listener for auth status.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        // ...
      } else {
        // User is signed out.
        setRedirect(true);
        // ...
      }
    });
    return () => {
      // cleanup
    };
  }, []);
  if (redirect) {
    return <Redirect to="/login" />;
  }
  const handleLogOut = e => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened
      });
  };
  return (
    <div>
      <GlobalStyle />

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
}
