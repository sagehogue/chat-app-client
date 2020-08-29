import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { FaUserFriends, FaRegComments, FaHome } from "react-icons/fa";
import styled from "styled-components";

import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import { firebaseController } from "../../App";

import FriendsTab from "./FriendsTab/FriendsTab";
import RoomsTab from "./RoomsTab/RoomsTab";
import Chat from "../../components/Chat/Chat";
import Join from "../../components/Join/Join";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

import { AuthContext } from "../../App";
import { BackdropContextProvier } from "../../components/UI/Backdrop/Backdrop";

import Theme from "../../util/Theme/Theme";
import GlobalStyle from "../../util/GlobalStyles/GlobalStyles";

//      **********TODOS***********
//
// Create roomDisconnect event to fire when user clicks X on chat window, thus leaving the chat.

//          *****STYLING*****
// Fix following issue: When page is loaded directly from url bar and not from login page, it redirects to login even if immediately authenticated.
// adjust proportions of menus - they take up too much space.
// Create chat bubbles, user text backgrounds for better message differentiation
// Chat app looks a little stretched out on desktop, adjust for better
// center focus

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
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: repeat(10, 1fr);
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  background: #016789;
`;

const Navigation = styled.nav`
  font-size: 2rem;
  display: flex;
  height: 10vh;
  justify-content: space-between;
  grid-row: ${Theme.layout.gridRowNav};
  width: 100%;
  grid-column: ${Theme.layout.gridColNav};
  z-index: 1;
  padding-top: 1rem;
  color: rgba(255, 255, 255, 0.9);
  & svg {
    transition: all ${Theme.navTransitionDuration};
  }
  & svg:first-child {
    margin-left: 1rem;
    color: ${(props) =>
      props.pageOnDisplay == "friends"
        ? `${Theme.navColorActive}`
        : `${Theme.navColorInactive}`};
  }
  & svg:last-child {
    margin-right: 1rem;
    color: ${(props) =>
      props.pageOnDisplay == "rooms"
        ? `${Theme.navColorActive}`
        : `${Theme.navColorInactive}`};
  }
      @media screen and (min-width: 1200px) {
        font-size: 2.25rem;
        & svg:first-child {
          margin-left: 3rem;
        }
        & svg:last-child {
          margin-right: 3rem;
        }
        }
        @media screen and (min-width: 1600px) {
          font-size: 2.5rem;
          & svg:first-child {
            margin-left: 4.5rem;
          }
          & svg:last-child {
            margin-right: 4.5rem;
          }
          }
          }
`;

export default function HomePage({ socket }) {
  let [display, setDisplay] = useState("initial");
  let [currentRoom, setCurrentRoom] = useState(false);
  let [showBackdrop, setShowBackdrop] = useState(false);
  let [showUsers, setShowUsers] = useState(false);
  let userAuth = useContext(AuthContext);
  console.log(`userAuth: ${userAuth}`);
  let firebaseDoesNotExist, db;
  // Check if firebase instance exists
  firebaseDoesNotExist = !firebase.apps.length;
  if (firebaseDoesNotExist) {
    // Initialize Firebase
    db = firebase.initializeApp(firebaseConfig).firestore();
  } else {
    db = firebase.app().firestore();
  }
  let user = userAuth;
  let name, email, photoUrl, uid, emailVerified;
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, use User.getToken()
  // instead.
  const handleJoinRoom = (room) => {
    console.log(`Room sent to backend: ${room}`);
    socket.emit("join", { name, room });
    setCurrentRoom(room);
  };

  const handleDisplayFriends = () => {
    setDisplay("friends");
  };
  const handleDisplayRooms = () => {
    setDisplay("rooms");
  };
  const handleRevertDefault = () => {
    setDisplay("initial");
  };

  const clearChat = (room) => {
    setCurrentRoom(false);
    disconnectUser(room);
  };

  const disconnectUser = (room) => {
    socket.emit("room-disconnect", { room, name });
  };

  const closeBackdrop = () => {
    setShowBackdrop(false);
    setShowUsers(false);
  };
  const openBackdrop = () => {
    setShowBackdrop(true);
  };

  return (
    <>
      <HomePageGrid>
        <GlobalStyle />
        <Navigation pageOnDisplay={display}>
          <FaUserFriends onClick={handleDisplayFriends} />
          <FaHome onClick={handleRevertDefault} /> {/* Link to homepage */}
          <FaRegComments onClick={handleDisplayRooms} />
        </Navigation>
        <FriendsTab
          pageOnDisplay={display}
          logoutHandler={firebaseController.logout}
        ></FriendsTab>
        {currentRoom ? (
          <Chat
            user={user}
            room={currentRoom}
            openBackdrop={openBackdrop}
            closeChatHandler={clearChat}
            socket={socket}
            showUsers={showUsers}
            setShowUsers={setShowUsers}
          />
        ) : (
          <Join user={user} joinHandler={handleJoinRoom} />
        )}
        <RoomsTab pageOnDisplay={display}></RoomsTab>
      </HomePageGrid>
      <Backdrop closeBackdrop={closeBackdrop} visible={showBackdrop} />
    </>
  );
}
