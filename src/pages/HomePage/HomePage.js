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
import CreateRoomModal from "./NewRoomModal/NewRoomModal";

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
  let [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  // fully accepted friends
  let [userFriends, setUserFriends] = useState([]);
  // users who have requested client's friendship
  let [userPendingFriends, setUserPendingFriends] = useState([]);
  // users who the client has sent friend requests to
  let [userSentFriendRequests, setUserSentFriendRequests] = useState([]);
  let [userRooms, setUserRooms] = useState(false);
  let [populatedRooms, setPopulatedRooms] = useState([]);
  let [newRoomData, setNewRoomData] = useState({});
  let userAuth = useContext(AuthContext);
  let user = userAuth;
  let name, email, photoUrl, uid, emailVerified;
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;
  // fetches friends

  useEffect(() => {
    socket.emit("requestTop8Rooms");
    socket.emit("requestUserRooms", uid);
    socket.emit("fetch-friends", { uid });
  }, []);

  socket.on("userFriends", (userFriends) => {
    console.log(`FRIEND DATA ${JSON.stringify(userFriends)}`);
    const friends = [];
    const friendsRequested = [];
    const pendingFriends = [];
    userFriends.map((friend) => {
      switch (friend.isFriend) {
        case "pending":
          pendingFriends.push(friend);
          return;
        case "sent":
          friendsRequested.push(friend);
          return;
        case true:
          friends.push(friend);
          return;
      }
    });
    setUserFriends(friends);
    setUserPendingFriends(pendingFriends);
    setUserSentFriendRequests(friendsRequested);
  });

  socket.on("userRooms", (userRooms) => {
    console.log(userRooms);
    setUserRooms(userRooms);
  });

  socket.on("top8Rooms", (topRooms) => setPopulatedRooms(topRooms));
  let firebaseDoesNotExist, db;
  // Check if firebase instance exists
  firebaseDoesNotExist = !firebase.apps.length;
  if (firebaseDoesNotExist) {
    // Initialize Firebase
    db = firebase.initializeApp(firebaseConfig).firestore();
  } else {
    db = firebase.app().firestore();
  }

  const handleJoinRoom = (room) => {
    console.log(`Room sent to backend: ${JSON.stringify(room)}`);
    socket.emit("join", { user: { displayName: name, id: uid }, room });
    setCurrentRoom(room);
  };

  const handleDisplayFriendsTab = () => {
    let newDisplay;
    newDisplay = display == "rooms" ? "initial" : "friends";
    setDisplay(newDisplay);
  };

  const handleCloseFriends = () => {
    let newDisplay;
    newDisplay = display == "initial" ? "rooms" : false;
    setDisplay(newDisplay);
  };

  // const handleUserPendingFriendChange = (newUserPendingFriendArray) => {
  //   setUserPendingFriends(newUserPendingFriendArray);
  // };

  const handleDisplayRooms = () => {
    let newDisplay;
    newDisplay = display == "friends" ? "initial" : "rooms";
    setDisplay(newDisplay);
  };

  const handleCloseRoomsTab = () => {
    let newDisplay;
    newDisplay = display == "initial" ? "friends" : false;
    setDisplay(newDisplay);
  };

  const handleRevertDefault = () => {
    setDisplay(false);
  };

  const clearChat = (room) => {
    setCurrentRoom(false);
    disconnectUser(room);
  };

  const disconnectUser = (room) => {
    socket.emit("room-disconnect", {
      room,
      user: { displayName: name, id: uid },
    });
  };

  const closeBackdrop = () => {
    setShowBackdrop(false);
    setShowCreateRoomModal(false);
    setShowUsers(false);
  };
  const openBackdrop = () => {
    setShowBackdrop(true);
  };

  const handleShowCreateRoomModal = () => {
    setShowCreateRoomModal(true);
    setShowBackdrop(true);
  };

  const declineFriendRequest = (id, requestAuthorID) => {
    socket.emit("decline-friend-request", { id, requestAuthorID });
  };

  const acceptFriendRequest = (id, requestAuthorID) => {
    socket.emit("accept-friend-request", { id, requestAuthorID });
  };

  socket.on("newRoomID", (roomID) => {
    const data = {
      user: { ...newRoomData.user },
      room: { ...newRoomData.room },
    };
    data.room.id = roomID;
    console.log(data);
    if (data.room.id && data.room.name && data.user.id && data.user.name)
      socket.emit("join", data);
  });

  const handleRoomCreation = (data) => {
    console.log(data);
    socket.emit("createNewRoom", data);
    setNewRoomData({
      room: { roomName: data.roomName, password: data.password },
      user: { id: data.creatorUID, name: data.creator },
    });

    const roomObj = data;
    const roomString = data.roomName;
    setCurrentRoom(data.roomName);
    closeBackdrop();
  };

  const handleAddFriend = (uid, friendUID, displayName) => {
    const newPendingFriend = { displayName, id: friendUID, isFriend: "sent" };
    const newArray = [...userPendingFriends, newPendingFriend];
    setUserPendingFriends(newArray);
    socket.emit("add-friend", { uid, friendUID });
  };

  const handleRemoveFriend = (uid, friendUID) => {
    // whether or not friendUID has been found in any of the friend states
    let notFound = true;

    // socket event that will fire if friendUID corresponds to a user.
    const emit = () => socket.emit("remove-friend", { uid, friendUID });
    // check pendingfriends for requested user
    const newPendingFriendArray = userPendingFriends.filter((friend) => {
      if (friend.id == friendUID) {
        notFound = false;
        return false;
      } else return true;
    });

    if (notFound) {
      // keep searching sent friends
      const newRequestedFriendArray = userSentFriendRequests.filter(
        (friend) => {
          if (friend.id == friendUID) {
            notFound = false;
            return false;
          } else return true;
        }
      );

      if (notFound) {
        // search accepted friends
        const newUserFriendArray = userFriends.filter((friend) => {
          if (friend.id == friendUID) {
            notFound = false;
            return false;
          } else return true;
        });

        if (notFound) {
          // error! uid doesn't correspond to any user in friends list
        } else {
          setUserFriends(newUserFriendArray);
          emit();
        }
      } else {
        setUserSentFriendRequests(newRequestedFriendArray);
        emit();
      }
    } else {
      setUserPendingFriends(newPendingFriendArray);
      emit();
    }
    console.log("removing friend!");
  };

  const requestFetchFriends = (uid) => {
    socket.emit("fetch-friend", { uid });
  };

  return (
    <>
      <HomePageGrid>
        <GlobalStyle />
        <Navigation pageOnDisplay={display}>
          <FaUserFriends onClick={handleDisplayFriendsTab} />
          <FaHome onClick={handleRevertDefault} /> {/* Link to homepage */}
          <FaRegComments onClick={handleDisplayRooms} />
        </Navigation>
        <FriendsTab
          pageOnDisplay={display}
          logoutHandler={firebaseController.logout}
          closeTabHandler={handleCloseFriends}
          friends={userFriends}
          pendingFriends={userPendingFriends}
          sentFriendRequests={userSentFriendRequests}
          clientID={uid}
          handleAccept={acceptFriendRequest}
          handleDecline={declineFriendRequest}
          handleDeleteFriend={handleRemoveFriend}
        ></FriendsTab>
        <CreateRoomModal
          visible={showCreateRoomModal}
          closeHandler={closeBackdrop}
          submitHandler={handleRoomCreation}
          user={user}
        />

        {currentRoom ? (
          <Chat
            user={user}
            room={currentRoom}
            openBackdrop={openBackdrop}
            closeChatHandler={clearChat}
            socket={socket}
            showUsers={showUsers}
            setShowUsers={setShowUsers}
            handleAddFriend={handleAddFriend}
            handleRemoveFriend={handleRemoveFriend}
          />
        ) : (
          <Join
            user={user}
            joinHandler={handleJoinRoom}
            previewedRooms={populatedRooms}
          />
        )}
        <RoomsTab
          joinHandler={handleJoinRoom}
          pageOnDisplay={display}
          closeTabHandler={handleCloseRoomsTab}
          createRoomHandler={handleShowCreateRoomModal}
          closeCreateRoomHandler={closeBackdrop}
          rooms={userRooms}
          user={{ id: uid, displayName: name }}
        ></RoomsTab>
      </HomePageGrid>
      <Backdrop closeBackdrop={closeBackdrop} visible={showBackdrop} />
    </>
  );
}
