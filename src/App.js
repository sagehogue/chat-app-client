import React, { useState, useEffect, useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import io from "socket.io-client";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import firebaseConfig from "./firebaseConfig";

import Loader from './components/UI/Animations/Loading/Loading'

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
<<<<<<< HEAD
import Gooey1 from "./components/UI/GUIMenu/GUIMenu";

import UserProfile from "./components/UserProfile/UserProfile";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
=======
>>>>>>> 0773e76ea750c78a4554658d2ddd3e8e227e3e90
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import GlobalStyle from "./util/GlobalStyles/GlobalStyles";

// TODOS
// Make a background component, use it on loginpage/homepage/loader to keep it from flashing white on load

// TODOS:
// Refactor redundant/useless code

// Initialize firebase for auth purposes
firebase.initializeApp(firebaseConfig);

// initialize socket.io
let socket;
const ENDPOINT = "localhost:5000";
const SocketContext = React.createContext(socket);
const SocketProvider = SocketContext.Provider;
export const SocketConsumer = SocketContext.Consumer;
// Listen for auth events
function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      socket = io(ENDPOINT);
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
export const UserConsumer = AuthContext.Consumer;



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
  const [user, setUser] = useState({ loggedIn: null });

  //  Maybe check if null, false, or true and display loading, loggedout, loggedin.

  // const [user, setUser] = useState({ loggedIn: firebase.auth().currentUser });

  // <ThemeContext.Consumer>
  //   {
  //     theme => (<UserContext.Consumer>
  //       {
  //         user => (<ProfilePage user={user} theme={theme} />)
  //       }
  //     </UserContext.Consumer>)
  //   }
  // </ThemeContext.Consumer>
  return (
    <Router>
<<<<<<< HEAD
      <UserProvider value={user}>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/chat" component={Chat} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/menu" component={Gooey1} />
        <Route path="/loadingAnimation" component={LoadingAnimation} />
        <GlobalStyle />
      </UserProvider>
=======
      <SocketProvider value={socket}>
        <UserProvider value={user}>
          {/* Put loading component here */}
          <Route path="/" exact render={props => user.loggedIn == null ? <Loader fullscreen /> : (
            user.loggedIn ? (
              <SocketConsumer>
                {socket => (
                  <HomePage socket={socket}{...props} />
                )}
              </SocketConsumer>
            ) : (
                <Redirect to="/login" />
              )
          )
          }
          />
          <Route path="/login" render={(props) => user.loggedIn == <Loader fullscreen /> ? null : (
            user.loggedIn ? (
              <Redirect to="/" />
            ) : (
                <LoginPage {...props} />
              )
          )} />
          <GlobalStyle />
        </UserProvider>
      </SocketProvider>
>>>>>>> 0773e76ea750c78a4554658d2ddd3e8e227e3e90
    </Router>
  );
};

export default App;
