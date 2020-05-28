import React, { useState, useEffect } from "react";
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
  align-items: flex-end;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #016789;
`;
const LogOutButton = styled(button)`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 3rem;
  margin-right: 3rem;
  color: black;
`;

const HomeNavBar = styled.nav`
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  height: 15vh;
  background: rgba(0, 0, 0, 0.6);
`;
const HomePageSelectorContainer = styled.div`
  height: 85vh;
  width: 80vw;
  background: #0090c1;
`;

const HomePageChatContainer = styled.div`
  margin: auto;
  height: 85vh;
  width: 60vw;
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
        <LogOutButton onClick={handleLogOut}>Log Out</LogOutButton>
        <HomePageSelectorContainer>
          <HomePageChatContainer></HomePageChatContainer>
        </HomePageSelectorContainer>
      </HomePageBackground>
    </div>
  );
}
