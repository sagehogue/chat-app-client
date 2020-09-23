import React, { useState, setState, createRef } from "react";

import styled from "styled-components";
import closeIcon from "../../icons/closeIcon.png";

import Theme from "../../util/Theme/Theme";

import { FaNapster, FaUserCircle } from "react-icons/fa";
import { BsGearFill, BsToggleOff } from "react-icons/bs";
import { TiUserAdd, TiUserDelete } from "react-icons/ti";
import { MdBlock } from "react-icons/md";

import CurrentUser from "../../App.js";

import uuid from "react-uuid";
import { getStorageRef } from "../../App";

// import FileUploader from "react-firebase-file-uploader";

const ProfileContainer = styled.div`
  position: absolute;
  height: 35rem;
  width: 20rem;
  margin-top: 4rem;
  background-color: ${Theme.backgroundColorDarkGray};
  border-radius: ${Theme.borderRadius};
  cursor: default;
  display: ${(props) => (props.profileDisplayState == true ? "flex" : "none")};
  flex-direction: column;
`;

const ProfilePicContainer = styled.div`
  position: relative;
  height: 15rem;
  width: 100%;
  background-color: ${Theme.backgroundColorLightGray};
  border-top-left-radius: ${Theme.borderRadius};
  border-top-right-radius: ${Theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const IMG = styled.img`
  height: 100%;
  width: 100%;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  margin-left: 0.5rem;
  padding: 1px;
  position: absolute;
  align-self: flex-start;
  z-index: 2;
  background-color: transparent;
  opacity: 0.7;
  border: none;
  border-radius: ${Theme.borderRadiusBtn};
  cursor: pointer;
  transition: ${Theme.transitionSpeed};
  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
  &:active {
    opacity: 0.8;
    transform: translateY(1px);
  }
`;

const StatusContainer = styled.div`
  @media screen and (min-width: 1px) {
    &&& svg {
      margin: 0;
      cursor: default;
      color: ${(props) => (props.online ? "lightgreen" : "red")};
    }
  }

  display: flex;
  justify-content: flex-start;
  width: 30%;
  font-size: ${Theme.fontSizeM};
  margin-top: 1rem;
  margin-left: 1rem;
`;

const StatusOnline = styled.div`
  display: ${(props) => (props.online ? "inline-block" : "none")};
`;

const StatusOffline = styled.div`
  display: ${(props) => (props.online ? "none" : "inline-block")};
`;

const StatusCircle = styled.div`
  width: 25%;
  transform: translateY(-4px);
`;

// const ProfilePicButtonContainer = styled.div`
//   position: absolute;
//   right: 0.8rem;
//   margin-top: 1.25rem;
//   display: flex;
//   justify-content: flex-end;
//   width: 30%;
//   font-size: 1.5rem;

//   margin-right: 1rem;
// `;
// const ChangeProfilePic = styled.button`
//   display: inline-block;
//   font-size: 0.7125rem;
//   padding: 0.25rem;
//   background-color: ${Theme.backgroundColorLightGray};
//   letter-spacing: 1px;
//   cursor: pointer;
//   border-radius: 2px;
//   border: none;
// `;

const MessageUser = styled.input`
  width: 80%;
  height: 30%;
  margin: 0 auto;
  margin-top: 4rem;
  padding-top: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;
  background-color: ${Theme.backgroundColorDarkerGray};
  overflow-y: scroll;
  border-radius: ${Theme.borderRadiusBtn};
  border: 1px solid ${Theme.backgroundColorLight};
  color: ${Theme.textColorLight};
  font-size: ${Theme.fontSizeS};
`;

const ActionsContainer = styled.div`
  padding-top: 5rem;
`;

const ActionsButtons = styled.div`
  display: flex;

  justify-content: space-around;
  width: 80%;
  padding-top: 0.5rem;
  margin: 0 auto;
  transition: ${Theme.transitionSpeed};
`;

export default function UserProfile({
  profileDisplayState,
  handleCloseProfile,
  logoutHandler,
  user,
  socket,
  id,
  profilePicURL = false,
  // handleOnlineStatus

  // handleProfilePic
}) {
  //determines whether profile pic or profile pic icon is displayed
  const [profilePic, setProfilePic] = useState(profilePicURL);

  //handles whether to display add or delete friend icon
  const [addFriend, setAddFriend] = useState(false);

  const fileRef = createRef();

  const storageRef = getStorageRef();
  const imageUuid = uuid();

  // const profilePictureRef = storageRef.child(`images/${imageUuid}`);

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   console.log(fileRef);
  //   profilePictureRef.put(fileRef.current.files[0]).then(function (snapshot) {
  //     console.log(snapshot);
  //     console.log("Uploaded a blob or file!");
  //     const profilePicRef = storageRef.child(`images/${imageUuid}`);

  //     profilePicRef.getDownloadURL().then((URL) => {
  //       console.log(URL);
  //       socket.emit("ChangeUserProfile", { id, URL });
  //       setProfilePic(URL);
  //     });
  //     console.log(profilePicRef.getDownloadURL());
  //   });
  // };

  const ProfilePicExists = (
    <ProfilePicContainer>
      <IMG src={profilePic}></IMG>
    </ProfilePicContainer>
  );
  const NoProfilePicExists = (
    <ProfilePicContainer>
      <FaNapster size={100} color={Theme.textColorDark}></FaNapster>
    </ProfilePicContainer>
  );

  const IsFriend = <TiUserDelete></TiUserDelete>;
  const IsNotFriend = <TiUserAdd></TiUserAdd>;

  return (
    <ProfileContainer profileDisplayState={profileDisplayState}>
      <CloseButton
        onClick={() => {
          handleCloseProfile();
        }}
      >
        <img src={closeIcon} alt="close icon" />
      </CloseButton>

      {profilePic ? ProfilePicExists : NoProfilePicExists}
      <ProfileInfoContainer>
        <StatusContainer online>
          <StatusCircle>
            <FaUserCircle size={10}></FaUserCircle>
          </StatusCircle>
          <StatusOnline online>Online</StatusOnline>
          <StatusOffline online>Offline</StatusOffline>
        </StatusContainer>
        {/* <ProfilePicButtonContainer>
          <ChangeProfilePic>Profile Picture</ChangeProfilePic>
        </ProfilePicButtonContainer> */}
        <MessageUser placeholder={`send user a message`}></MessageUser>
        <ActionsContainer>
          <ActionsButtons>
            {addFriend ? IsFriend : IsNotFriend}
            <MdBlock></MdBlock>
          </ActionsButtons>
        </ActionsContainer>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
}
