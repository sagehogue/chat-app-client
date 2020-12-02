import React, { useState, useEffect, createRef } from 'react'
import styled from 'styled-components'
import Theme from '../../util/Theme/Theme'
import { Modal } from "../../components/UI/Modal/NewModal";

import SubmitButton from '../../components/UI/Buttons/SubmitButton'
import { FaNapster, FaUserCircle } from "react-icons/fa";
import { BsGearFill, BsToggleOff } from "react-icons/bs";
import CurrentUser, { getStorageRef } from "../../App.js";
import uuid from "react-uuid";
import Settings from "./Settings";
import { firebaseController } from "../../App";

const ProfileContainer = styled(Modal)`
  height: 87vh;
  background-color: ${Theme.theme3.color5};
  border-radius: ${Theme.borderRadius};
  cursor: default;
  flex-direction: column;
  align-self: flex-start;
  transform: translateY(.03rem);
`;
const ProfilePicContainer = styled.div`
  position: relative;
  height: 40%;
  width: 100%;
  background-color: ${Theme.theme3.color2};
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
  // background: ${Theme.backgroundColorLightGray};
  color: ${Theme.textColorLight};
  width: 80%;
  margin-left: 3rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;
const IMG = styled.img`
  height: 100%;
  width: 100%;
`;
const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 5rem;
`;
const SettingsButton = styled.div`
  position: relative;
  width: 40%;
  padding-top: 8rem;
  margin-right: 4rem;
  transition: all ${Theme.transitionSpeed};
  &:hover {
    // padding-top: 7.75rem;
    scale: 1.075;
  }
`;

export default function UserProfileModal({profileDisplayState,
    handleCloseProfile, profilePicURL, id, socket}) {const [displaySettings, setDisplaySettings] = useState(false); // Responsible for whether or not settings are shown

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
        <ProfileContainer  shouldDisplay={profileDisplayState}>
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
            <SubmitButton type="submit">submit</SubmitButton>
          </PicFormStyle>
        </ProfilePicContainer>
      )}
      <SettingsContainer>
          <SettingsButton onClick={handleSettings}>
            <BsGearFill size={40} color={"#fff"}></BsGearFill>
          </SettingsButton>
        </SettingsContainer>
        </ProfileContainer>
    )
}
