import React, { useState, useEffect, useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
<<<<<<< HEAD
=======
import "firebase/storage";
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
import io from "socket.io-client";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import firebaseConfig from "./firebaseConfig";

import Loader from "./components/UI/Animations/Loading/Loading";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import GlobalStyle from "./util/GlobalStyles/GlobalStyles";

// TODOS:
// Refactor redundant/useless code. Looks like there's lots of repetition here.
// Make a background component, use it on loginpage/homepage/loader to keep it from flashing white on load

// Initialize firebase for auth purposes
firebase.initializeApp(firebaseConfig);

// initialize socket.io
let socket;
const ENDPOINT = "localhost:5000";
const SocketContext = React.createContext(socket);
const SocketProvider = SocketContext.Provider;
export const SocketConsumer = SocketContext.Consumer;
<<<<<<< HEAD
=======
socket = io(ENDPOINT, { query: "displayName=``" });
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
// Listen for auth events
function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Socket.io connecting displayName " + user.displayName);
<<<<<<< HEAD
      socket = io(ENDPOINT, { query: `displayName=${user.displayName}` });
=======
      socket.query = { displayName: user.displayName, id: user.uid };
      // socket = io(ENDPOINT, { query: `displayName=${user.displayName}` });
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
      callback({
        loggedIn: true,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous,
        uid: user.uid,
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

export const getStorageRef = () => {
  const storage = firebase.storage();
  return storage.ref();
};

<<<<<<< HEAD

=======
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
export const firebaseController = {
  login: (email, password) => login(email, password),
  logout: logout,
};
// Initial/default context state
const defaultUser = { loggedIn: false };
// object which must be imported to access context
export const AuthContext = React.createContext(defaultUser);

const UserProvider = AuthContext.Provider;
export const UserConsumer = AuthContext.Consumer;

// END OF FUNCTION DEFINITIONS

<<<<<<< HEAD
=======
export const CurrentUser = () => {
  return firebase.auth().currentUser;
};

>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
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
      <SocketProvider value={socket}>
        <UserProvider value={user}>
          {/* Put loading component here */}
          <Route
            path="/"
            exact
            render={(props) =>
              user.loggedIn == null ? (
                <Loader fullscreen />
              ) : user.loggedIn ? (
                <SocketConsumer>
                  {(socket) => <HomePage socket={socket} {...props} />}
                </SocketConsumer>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/login"
            render={(props) =>
              user.loggedIn == <Loader fullscreen /> ? null : user.loggedIn ? (
                <Redirect to="/" />
              ) : (
<<<<<<< HEAD
                <LoginPage {...props} />
=======
                <SocketConsumer>
                  {(socket) => <LoginPage socket={socket} {...props} />}
                </SocketConsumer>
>>>>>>> 379a6177d2975f524ffddd8f6679bb16bb7bc3ba
              )
            }
          />
          <GlobalStyle />
        </UserProvider>
      </SocketProvider>
    </Router>
  );
};

export default App;
