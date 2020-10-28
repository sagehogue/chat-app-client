import React, { useState, useEffect, createRef } from "react";

import styled from "styled-components";
import closeIcon from "../../icons/closeIcon.png";

import Theme from "../../util/Theme/Theme";
import { firebaseController } from "../../App";

import { FaNapster, FaUserCircle } from "react-icons/fa";
import { BsGearFill, BsToggleOff } from "react-icons/bs";

import CurrentUser, { getStorageRef } from "../../App.js";

import uuid from "react-uuid";

// import FileUploader from "react-firebase-file-uploader";

import Settings from "./Settings";

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
  z-index: 5;
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

const PicFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  height: 90%;
  width: 90%;
  font-size: ${Theme.fontSizeS};
`;

const PicLabel = styled.label`
  color: ${Theme.backgroundColorDarkGray};
  display: flex;
  margin-top: 3rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;

  @media screen and (min-width: 1px) {
    &&& svg {
      margin: 0;
    }
  }
`;

const PicInput = styled.input`
  border: none;
  background: ${Theme.backgroundColorLigjtGray};
  color: ${Theme.textColorLight};
  width: 80%;
  margin-left: 3rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;

const SubmitPic = styled.button`
  border: none;
  background: ${Theme.backgroundColorDarkGray};
  color: ${Theme.textColorLight};
  padding: 0.15rem;
  border-radius: ${Theme.borderRadiusBtn};
  border: 1px solid ${Theme.backgroundColorDarkerGray};
  width: 30%;
  margin: 0 auto;
  margin-bottom: 3rem;
  margin-top: 1rem;
  cursor: pointer;
  transition-all: ${Theme.transitionSpeed};
  &:hover {
    scale: 1.1;
  }
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
  border-radius: 3px;
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

//remove

const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 5rem;
`;

const SettingsToolTip = styled.div``;

const SettingsButton = styled.div`
  position: relative;
  width: 40%;
  padding-top: 8rem;
  margin-right: 4rem;
  transition: ${Theme.transitionSpeed};
  &:hover {
    padding-top: 7.75rem;
    scale: 1.075;
  }
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
  const [displaySettings, setDisplaySettings] = useState(false); // Responsible for whether or not settings are shown

  const handleSettings = () => {
    setDisplaySettings(true);
  };
  const handleRevertToProfile = () => {
    setDisplaySettings(false);
  };

  const [profilePic, setProfilePic] = useState(profilePicURL);

  useEffect(() => {
    setProfilePic(profilePicURL);
  }, [profilePicURL]);

  // Reference to our uploaded file
  const fileRef = createRef();

  const storageRef = getStorageRef();

  // Newly generated unique ID
  const imageUuid = uuid();
  const profilePictureRef = storageRef.child(`images/${imageUuid}`);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(fileRef);
    profilePictureRef.put(fileRef.current.files[0]).then(function (snapshot) {
      console.log(snapshot);
      console.log("Uploaded a blob or file!");
      const profilePicRef = storageRef.child(`images/${imageUuid}`);

      profilePicRef.getDownloadURL().then((url) => {
        console.log(url);
        socket.emit("change-avatar", { id, image: { id: imageUuid, url } });
        setProfilePic(url);
      });
    });
  };
  console.log(profilePicURL + "\n" + profilePic);
  return (
    <ProfileContainer profileDisplayState={profileDisplayState}>
      <CloseButton
        onClick={() => {
          handleCloseProfile();
          handleRevertToProfile();
        }}
      >
        <img src={closeIcon} alt="close icon" />
      </CloseButton>
      <Settings
        settingsActive={displaySettings}
        handleRevertToProfile={handleRevertToProfile}
        logoutHandler={firebaseController.logout}
        socket={socket}
        id={id}
        profilePicURL={profilePicURL}
      ></Settings>

      {profilePic ? (
        <ProfilePicContainer>
          <IMG src={profilePic}></IMG>
        </ProfilePicContainer>
      ) : (
        <ProfilePicContainer>
          <PicFormStyle onSubmit={submitHandler}>
            <PicLabel>
              {/* {" "} */}
              Upload Profile Pic
              <FaNapster size={100} color={"rgba(43, 43, 43, 1)"}></FaNapster>
              <PicInput type="file" name="file" ref={fileRef} />
            </PicLabel>
            <SubmitPic type="submit">submit</SubmitPic>
          </PicFormStyle>
        </ProfilePicContainer>
      )}
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

        <SettingsContainer>
          <SettingsButton onClick={handleSettings}>
            <BsGearFill size={40} color={"#fff"}></BsGearFill>
          </SettingsButton>
        </SettingsContainer>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
}
