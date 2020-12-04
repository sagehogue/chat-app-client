import React, { useState, useEffect, createRef } from 'react'
import styled from 'styled-components'
import Theme from '../../util/Theme/Theme'
import { Modal } from "../../components/UI/Modal/NewModal";

import SubmitButton from '../../components/UI/Buttons/SubmitButton'
import { FaNapster, FaUserCircle } from "react-icons/fa";
import { BsGearFill, BsToggleOff } from "react-icons/bs";
import CurrentUser, { getStorageRef } from "../../App.js";
import uuid from "react-uuid";
import SettingsModal from "./SettingsModal";
import { firebaseController } from "../../App";

const ProfileContainer = styled(Modal)`
  height: 87vh;
  background-color: ${Theme.theme3.color5};
  border-radius: ${Theme.borderRadius};
  cursor: default;
  flex-direction: column;
  align-self: flex-start;
  position: relative;
  
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
  justify-content: center;
  text-align: center;
  height: 90%;
  width: 90%;
  font-size: ${Theme.fontSizeS};
`;

const PicLabel = styled.label`
  color: ${Theme.offWhite};
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
  display: none;
`;

const PicInputLabel = styled.label`
margin-top: 2.5rem;
cursor: pointer;
color: ${Theme.offWhite};
border: none;
&:hover {
  color: ${Theme.theme3.highlight2};
}
`

const IMG = styled.img`
  height: 90%;
  width: 38%;
  border-radius: 50%;
`;

const Submit = styled(SubmitButton)`
height: 3.5rem;
width: 10rem;

`

const ProfileInfoContainer = styled.div`
height: 60%; 
width: 100%;
display: flex;
justify-content: center;


`

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 12rem;
  background-color: ${Theme.theme3.opaqueBlack};
  border-radius: ${Theme.borderRadiusBtn};
transition: ${Theme.transitionSpeed};
  cursor: pointer;
  position: absolute;
  bottom: 1rem;
  
  margin: auto;
  &:hover {
    border: 1px solid ${Theme.theme3.highlight2};
    box-shadow: 0 0 8px 2px ${Theme.theme3.highlight2};
  }
`;
const SettingsButton = styled.div`
  
  
  
  transition: all ${Theme.transitionSpeed};
  &:hover {
    color: ${Theme.theme3.highlight2};
    cursor: pointer;
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
            <SettingsModal
        settingsActive={displaySettings}
        handleRevertToProfile={handleRevertToProfile}
        logoutHandler={firebaseController.logout}
        socket={socket}
        id={id}
        profilePicURL={profilePicURL}
      ></SettingsModal>
            {profilePic ? (
        <ProfilePicContainer>
          <IMG src={profilePic}></IMG>
        </ProfilePicContainer>
      ) : (
        <ProfilePicContainer>
          <PicFormStyle onSubmit={submitHandler}>
            <PicLabel>
              {/* {" "} */}
              
              <FaNapster size={150} color={`${Theme.offWhite}`}></FaNapster>
              <PicInput type="file" name="file" id="files" ref={fileRef} />
              <PicInputLabel for="files">Browse for Profile Picture</PicInputLabel>
            </PicLabel>
            <Submit type="submit">submit</Submit>
          </PicFormStyle>
        </ProfilePicContainer>
      )}
      <ProfileInfoContainer>
      <SettingsContainer onClick={handleSettings}>
          <SettingsButton >
            <BsGearFill size={40} color={`${Theme.offWhite}`}></BsGearFill>
          </SettingsButton>
        </SettingsContainer>
        </ProfileInfoContainer>
        </ProfileContainer>
    )
}
