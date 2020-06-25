import React, { useState, useEffect, useCallback } from "react";

import * as firebase from "firebase/app";
import "firebase/auth";

import { BrowserRouter as Router, Route } from "react-router-dom";

import firebaseConfig from "./firebaseConfig";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import Gooey1 from "./components/UI/GUIMenu/GUIMenu";

import UserProfile from "./components/UserProfile/UserProfile";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import GlobalStyle from "./components/UI/GlobalStyles/GlobalStyles";

// TODOS:
// Refactor redundant/useless code

// Initialize firebase for auth purposes
firebase.initializeApp(firebaseConfig);

// Listen for auth events
function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({
        loggedIn: true,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous,
        uid: user.uid
      });
    } else {
      callback({ loggedIn: false });
    }
  });
}

function login(username, password) {
  firebase.auth().signInWithEmailAndPassword(username, password);
}
function logout() {
  firebase.auth().signOut();
}

export const firebaseController = {
  login: (email, password) => login(email, password),
  logout: logout
};
// Initial/default context state
const defaultUser = { loggedIn: false };
// object which must be imported to access context
export const AuthContext = React.createContext(defaultUser);

const UserProvider = AuthContext.Provider;
const UserConsumer = AuthContext.Consumer;

const App = () => {
  const requestLogin = useCallback((username, password) => {
    login(username, password);
  });
  const requestLogout = useCallback(() => {
    logout();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);
  const [user, setUser] = useState({ loggedIn: false });
  return (
    <Router>
      <UserProvider value={user}>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/chat" component={Chat} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/menu" component={Gooey1} />
        <Route path="/loadingAnimation" component={LoadingAnimation} />
        <GlobalStyle />
      </UserProvider>
    </Router>
  );
};

export default App;
