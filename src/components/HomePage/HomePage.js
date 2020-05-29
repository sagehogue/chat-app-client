import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
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

            <HomePageBackground>
                <LogOutButton onClick={firebaseController.logout}>Log Out</LogOutButton>
                <HomePageSelectorContainer>
                    <HomePageChatContainer></HomePageChatContainer>
                </HomePageSelectorContainer>
            </HomePageBackground>
        </div>
    );
}
