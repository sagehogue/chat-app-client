import React, { useState, setState, createRef } from "react";

import styled from "styled-components";
import closeIcon from "../../icons/closeIcon.png";
import button from "../UI/Button/Button";
import Theme from "../../util/Theme/Theme";

import { FaNapster, FaUserCircle } from "react-icons/fa";
import { BsGearFill, BsToggleOff } from "react-icons/bs";

import axios from "axios";
import uuid from "react-uuid";
import { getStorageRef } from "../../App";

// import FileUploader from "react-firebase-file-uploader";

import Settings from "./Settings";

const ProfileContainer = styled.div`
  position: absolute;
  height: 35rem;
  width: 20rem;
  margin-top: 4rem;
  background-color: #333;
  border-radius: 1rem;
  cursor: default;
  display: ${(props) => (props.profileDisplayState == true ? "flex" : "none")};
  flex-direction: column;
`;

const ProfilePicContainer = styled.div`
  position: relative;
  height: 15rem;
  width: 100%;
  background-color: ${Theme.backgroundColorLightGray};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: red;
  opacity: 0.7;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    opacity: 1;
    transform: translateY(-1px);
    box-shadow: 0.2rem 0.2rem 1.4rem rgba(0, 0, 0, 0.4);
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
  font-size: 1.5rem;
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

const ProfilePicButtonContainer = styled.div`
  position: absolute;
  right: 0.8rem;
  margin-top: 1.25rem;
  display: flex;
  justify-content: flex-end;
  width: 30%;
  font-size: 1.5rem;

  margin-right: 1rem;
`;
const ChangeProfilePic = styled.button`
  display: inline-block;
  font-size: 0.7125rem;
  padding: 0.25rem;
  background-color: ${Theme.backgroundColorLightGray};
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 2px;
  border: none;
`;

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
  border-radius: 3px;
  border: 1px solid ${Theme.backgroundColorLight};
  color: ${Theme.textColorLight};
  font-size: 1rem;
`;

const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 5rem;
`;

const SettingsButton = styled.div`
  width: 40%;
  padding-top: 0.5rem;
  margin-right: 4rem;
  transition: 0.3s;
  &:hover {
    scale: 1.1;
  }
`;

const LogOutButton = styled(button)`
  color: ${Theme.textColorLight};
  border: 1px #fff solid;
  background-color: ${Theme.backgroundColorDarkGray};
  color: ${Theme.textColorLight};
  margin-right: 4rem;
  cursor: pointer;
  &:hover {
    background-color: ${Theme.backgroundColorDarkerGray};
  }
`;

export default function UserProfile({
  profileDisplayState,
  handleCloseProfile,
  logoutHandler,
  // handleOnlineStatus

  // handleProfilePic
}) {
  const [displaySettings, setDisplaySettings] = useState(false);
  const handleSettings = () => {
    setDisplaySettings(true);
  };
  const handleRevertToProfile = () => {
    setDisplaySettings(false);
  };

  const fileRef = createRef();
  const storageRef = getStorageRef();
  const imageUuid = uuid();
  const profilePictureRef = storageRef.child(`images/${imageUuid}`);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(fileRef);
    profilePictureRef.put(fileRef.current.files[0]).then(function (snapshot) {
      console.log("Uploaded a blob or file!");
    });
  };

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
      ></Settings>

      <ProfilePicContainer>
        <FaNapster size={100} color={"black"}></FaNapster>
        <form onSubmit={submitHandler}>
          <label>
            {" "}
            Upload Profile Pic
            <input type="file" name="file" ref={fileRef} />
          </label>
          <button type="submit">submit</button>
        </form>
      </ProfilePicContainer>
      <ProfileInfoContainer>
        <StatusContainer online>
          <StatusCircle>
            <FaUserCircle size={10}></FaUserCircle>
          </StatusCircle>
          <StatusOnline online>Online</StatusOnline>
          <StatusOffline online>Offline</StatusOffline>
        </StatusContainer>
        <ProfilePicButtonContainer>
          <ChangeProfilePic>Profile Picture</ChangeProfilePic>
        </ProfilePicButtonContainer>
        <MessageUser placeholder={`send user a message`}></MessageUser>
        <SettingsContainer>
          <SettingsButton onClick={handleSettings}>
            <BsGearFill size={40} color={"#fff"}></BsGearFill>
          </SettingsButton>
          <LogOutButton onClick={() => logoutHandler()}>Log Out</LogOutButton>
        </SettingsContainer>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
}
