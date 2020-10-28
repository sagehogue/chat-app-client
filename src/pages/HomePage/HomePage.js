import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { FaUserFriends, FaRegComments, FaHome } from "react-icons/fa";
import styled from "styled-components";

import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import { firebaseController } from "../../App";
import { socket } from "../../App";

import FriendsTab from "./FriendsTab/FriendsTab";
import RoomsTab from "./RoomsTab/RoomsTab";
import Chat from "../../components/Chat/Chat";
import Join from "../../components/Join/Join";
import UserSearch from "../../components/UI/SearchBar/UserSearchBar/UserSearchBar";
import RoomSearch from "../../components/UI/SearchBar/RoomSearch/RoomSearchModal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import CreateRoomModal from "./NewRoomModal/NewRoomModal";
import CurrentUserProfile from "../../components/Profile/CurrentUserProfile.jsx";
import UserProfile from "../../components/Profile/UserProfile.jsx";

import { AuthContext } from "../../App";

import { BackdropContextProvier } from "../../components/UI/Backdrop/Backdrop";

import Theme from "../../util/Theme/Theme";
import GlobalStyle from "../../util/GlobalStyles/GlobalStyles";

//      **********TODOS***********
//
// Create addUserList

//          *****STYLING*****
// Fix following issue: When page is loaded directly from url bar and not from login page, it redirects to login even if immediately authenticated.
// adjust proportions of menus - they take up too much space.
// Create chat bubbles, user text backgrounds for better message differentiation
// Chat app looks a little stretched out on desktop, adjust for better
// center focus

const HomePageGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: repeat(10, 1fr);
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  background: ${Theme.backgroundColorLight};
`;

const Navigation = styled.nav`
  font-size: ${Theme.fontSizeL};
  display: flex;
  height: 10vh;
  justify-content: space-between;
  grid-row: ${Theme.layout.gridRowNav};
  width: 100%;
  grid-column: ${Theme.layout.gridColNav};
  z-index: ${Theme.zIndex.nav};
  padding-top: 1rem;
  color: rgba(255, 255, 255, 0.9);
  & svg {
    transition: all ${Theme.navTransitionDuration};
  }
  & svg:first-child {
    margin-left: 1rem;
    color: ${(props) =>
      props.pageOnDisplay == "friends"
        ? `${Theme.navColorInactive}`
        : `${Theme.navColorInactive}`};
        cursor: pointer;
  }
  & svg:last-child {
    margin-right: 1rem;
    color: ${(props) =>
      props.pageOnDisplay == "rooms"
        ? `${Theme.navColorActive}`
        : `${Theme.navColorInactive}`};
        cursor: pointer;
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

const HomeAndUser = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
`;

const UserNameDisplay = styled.div`
  font-size: ${Theme.fontSizeL};
  color: ${Theme.textColorDark};
  padding-left: 1rem;
  z-index: 1;
`;

export const emitJoin = (roomAndUserObject) => {
  socket.emit("join", roomAndUserObject);
};

export default function HomePage() {
  // "initial", "rooms", "friends", "none" which side tabs are active, initial is both
  let [display, setDisplay] = useState("initial");
  // whether to display the user profile
  let [displayProfile, setDisplayProfile] = useState(false);
  // whether to display user search component
  let [displayUserSearch, setDisplayUserSearch] = useState(false);
  // whether to display room search component
  let [displayRoomSearch, setDisplayRoomSearch] = useState(false);

  // current room the user has joined, default is false
  let [currentRoom, setCurrentRoom] = useState(false);
  // whether or not backdrop is enabled
  let [showBackdrop, setShowBackdrop] = useState(false);
  // fully accepted friends
  let [userFriends, setUserFriends] = useState([]);
  // users who have requested client's friendship
  let [userPendingFriends, setUserPendingFriends] = useState([]);
  // users who the client has sent friend requests to
  let [userSentFriendRequests, setUserSentFriendRequests] = useState([]);
  let [showUsers, setShowUsers] = useState(false);
  let [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  let [isCurrentUser, setIsCurrentUser] = useState(true);
  let [avatar, setAvatar] = useState(false);
  let [userRooms, setUserRooms] = useState(false);
  let [populatedRooms, setPopulatedRooms] = useState([]);
  let [newRoomData, setNewRoomData] = useState({});
  // whether or not roomSettings is visible to user
  const [showRoomSettings, setShowRoomSettings] = useState(false);
  let userAuth = useContext(AuthContext);
  let user = userAuth;
  let name, email, photoUrl, uid, emailVerified;
  name = user.displayName;
  uid = user.uid;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;

  // fetches friends

  // SIDE EFFECTS

  useEffect(() => {
    socket.emit("requestTop8Rooms");
    socket.emit("requestUserRooms", uid);
    socket.emit("fetch-friends", { uid });
    socket.emit("fetch-avatar", { id: uid });
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", manualDisconnect);
    return () => {
      window.removeEventListener("beforeunload", manualDisconnect);
    };
  }, []);

  useEffect(() => {
    socket.emit("user-status", {
      name,
      id: uid,
      socket: socket.id,
      room: currentRoom,
      online: true,
    });
  }, [currentRoom]);

  // SOCKET EVENT LISTENERS

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

  socket.on("new-avatar", (avatar) => {
    setAvatar(avatar);
  });

  socket.on("userRooms", (userRooms) => {
    console.log(userRooms);
    setUserRooms(userRooms);
  });

  socket.on("new-friend-request", (friendRequest) => {
    const newRequests = [...userPendingFriends, friendRequest];
    setUserPendingFriends(newRequests);
  });

  socket.on("top8Rooms", (topRooms) => setPopulatedRooms(topRooms));

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

  // SOCKET EVENT EMITTERS

  const disconnectUser = (room) => {
    socket.emit("room-disconnect", {
      room,
      user: { displayName: name, id: uid },
    });
  };

  const declineFriendRequest = (id, requestAuthorID) => {
    socket.emit("decline-friend-request", { id, requestAuthorID });
  };

  const acceptFriendRequest = (id, requestAuthorID) => {
    socket.emit("accept-friend-request", { id, requestAuthorID });
  };

  const handleRoomCreation = (data) => {
    console.log(data);
    socket.emit("createNewRoom", data);
    setNewRoomData({
      room: { roomName: data.roomName, password: data.password },
      user: { id: data.creatorUID, name: data.creator },
    });

    const roomObj = data;
    const roomString = data.roomName;
    setCurrentRoom({ roomName: data.roomName, roomID: data.roomID });
    closeBackdrop();
  };

  //save room

  const handleAddSavedRoom = (id, roomID) => {
    console.log("saved");
    socket.emit("add-saved-room", { id, roomID });
  };

  //remove saved room

  const handleRemoveSavedRoom = (id, roomID) => {
    console.log("removed " + id + " " + roomID);
    socket.emit("remove-saved-room", { id, roomID });
  };

  //favorite room

  const handleAddFavoriteRoom = (id, roomID) => {
    socket.emit("add-favorite-room", { id, roomID });
  };

  //rmv favorite room
  const handleRemoveFavoriteRoom = (id, roomID) => {
    console.log("removed " + id + " " + roomID);
    socket.emit("remove-favorite-room", { id, roomID });
  };

  const handleAddFriend = (uid, friendUID, displayName) => {
    const newPendingFriend = { displayName, id: friendUID, isFriend: "sent" };
    const newArray = [...userPendingFriends, newPendingFriend];
    setUserSentFriendRequests(newArray);
    socket.emit("add-friend", { uid, friendUID });
  };

  const handleRemoveFriend = (uid, friendUID, callback = false) => {
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
    if (callback) {
      callback();
    }
  };

  const requestFetchFriends = (uid) => {
    socket.emit("fetch-friend", { uid });
  };

  const handleCancelFriendRequest = (authorID, recipientID) => {
    socket.emit("cancel-friend-request", {
      authorID,
      recipientID,
    });
  };

  // FUNCTIONS

  const setStateTrue = (state) => {
    state(true);
  };

  const manualDisconnect = () => {
    socket.disconnect();
  };

  const handleJoinRoom = (room) => {
    console.log({ user: { displayName: name, id: uid }, room });
    emitJoin({ user: { displayName: name, id: uid }, room });
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

  const closeBackdrop = () => {
    setShowBackdrop(false);
    setShowCreateRoomModal(false);
    setShowUsers(false);
    setDisplayUserSearch(false);
    setDisplayRoomSearch(false);
    setShowRoomSettings(false);
  };

  const openBackdrop = () => {
    setShowBackdrop(true);
  };

  const handleOpenRoomSettings = () => {
    openBackdrop();
    setShowRoomSettings(true);
  };

  const handleShowCreateRoomModal = () => {
    setShowCreateRoomModal(true);
    setShowBackdrop(true);
  };

  const handleDisplayProfile = () => {
    console.log("test");
    setDisplayProfile(true);
  };

  const closeProfileHandler = () => {
    setDisplayProfile(false);
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

  const IsCurrentUserProfile = (
    <CurrentUserProfile
      id={uid}
      socket={socket}
      profileDisplayState={displayProfile}
      handleCloseProfile={closeProfileHandler}
      logoutHandler={firebaseController.logout}
      user={user}
      profilePicURL={avatar.url}
    ></CurrentUserProfile>
  );

  const OtherUser = (
    <UserProfile
      id={uid}
      socket={socket}
      profileDisplayState={displayProfile}
      handleCloseProfile={closeProfileHandler}
      logoutHandler={firebaseController.logout}
      user={user}
    ></UserProfile>
  );

  console.log(avatar);

  return (
    <>
      <HomePageGrid>
        <GlobalStyle />
        <Navigation pageOnDisplay={display}>
          <FaUserFriends onClick={handleDisplayFriendsTab} />
          <HomeAndUser>
            <FaHome onClick={handleRevertDefault} /> {/* Link to homepage */}
            <UserNameDisplay onClick={handleDisplayProfile}>
              {user.displayName}
            </UserNameDisplay>
            {isCurrentUser ? IsCurrentUserProfile : OtherUser}
          </HomeAndUser>
          <FaRegComments onClick={handleDisplayRooms} />
        </Navigation>
        <FriendsTab
          pageOnDisplay={display}
          closeTabHandler={handleCloseFriends}
          friends={userFriends}
          pendingFriends={userPendingFriends}
          sentFriendRequests={userSentFriendRequests}
          clientID={uid}
          handleAccept={acceptFriendRequest}
          handleDecline={declineFriendRequest}
          handleDeleteFriend={handleRemoveFriend}
          handleCancelFriendRequest={handleCancelFriendRequest}
          openUserSearchHandler={() => {
            openBackdrop();
            setStateTrue(setDisplayUserSearch);
          }}
        ></FriendsTab>
        <CreateRoomModal
          visible={showCreateRoomModal}
          closeHandler={closeBackdrop}
          submitHandler={handleRoomCreation}
          user={user}
        />
        <UserSearch
          visible={displayUserSearch}
          closeHandler={() => {
            closeBackdrop();
            setDisplayUserSearch(false);
          }}
        />
        <RoomSearch
          visible={displayRoomSearch}
          closeHandler={() => {
            closeBackdrop();
            setDisplayRoomSearch(false);
          }}
          joinHandler={(roomObj) => {
            setCurrentRoom(roomObj);
          }}
        />
        ;
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
            userRooms={userRooms}
            avatar={avatar.url}
            handleAddSavedRoom={handleAddSavedRoom}
            handleRemoveSavedRoom={handleRemoveSavedRoom}
            handleAddFavoriteRoom={handleAddFavoriteRoom}
            handleRemoveFavoriteRoom={handleRemoveFavoriteRoom}
            handleOpenRoomSettings={handleOpenRoomSettings}
            handleCloseRoomSettings={closeBackdrop}
            showRoomSettings={showRoomSettings}
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
          handleRemoveSavedRoom={handleRemoveSavedRoom}
          addFavorite={handleAddFavoriteRoom}
          removeFavorite={handleRemoveFavoriteRoom}
          pageOnDisplay={display}
          closeTabHandler={handleCloseRoomsTab}
          createRoomHandler={handleShowCreateRoomModal}
          closeCreateRoomHandler={closeBackdrop}
          rooms={userRooms}
          user={{ id: uid, displayName: name }}
          openRoomSearchHandler={() => {
            openBackdrop();
            setStateTrue(setDisplayRoomSearch);
          }}
        ></RoomsTab>
      </HomePageGrid>

      <Backdrop closeBackdrop={closeBackdrop} visible={showBackdrop} />
    </>
  );
}
