import React, { useState, useEffect, createRef } from 'react'
import styled from 'styled-components'
import Theme from '../../util/Theme/Theme'
import { Modal } from "../../components/UI/Modal/NewModal";

import SubmitButton from '../../components/UI/Buttons/SubmitButton'
import { FaUserSecret, FaCircle } from "react-icons/fa";
import { BsGearFill, BsToggleOff } from "react-icons/bs";
import CurrentUser, { getStorageRef } from "../../App.js";
import uuid from "react-uuid";
import SettingsModal from "./SettingsModal";
import { firebaseController } from "../../App";

//styles for entire profile component
const ProfileContainer = styled(Modal)`
  height: 87vh;
  background-color: ${Theme.theme3.color5};
  border-radius: ${Theme.borderRadius};
  cursor: default;
  flex-direction: column;
  align-self: flex-start;
  position: relative;
  
`;

//styles for top portion of profile component
const ProfilePicContainer = styled.div`
  position: relative;
  height: 40%;
  width: 100%;
  background-color: ${Theme.theme3.color2};
  border-top-left-radius: ${Theme.borderRadius};
  border-top-right-radius: ${Theme.borderRadius};
  display: flex;
  flex-direction: column;
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
border-radius: ${Theme.borderRadiusBtn};
background-color: ${Theme.theme3.opaqueBlack};
padding: .5rem;
border: 1px solid transparent;
transition: all ${Theme.transitionSpeed};
&:hover {
  border: 1px solid ${Theme.theme3.highlight2};
  box-shadow: 0 0 8px 2px ${Theme.theme3.highlight2};
  cursor: pointer;
}`

const IMG = styled.img`
 height: 15rem;
  width: 15rem;
  border-radius: 50%;
`;

const UserName = styled.div`
font-size: 2.55rem;
color: ${Theme.theme3.font.lightcolor};
border-bottom: 3px solid ${Theme.theme3.font.lightcolor};
`
const Submit = styled(SubmitButton)`
height: 3.5rem;
width: 10rem;

`

const StatusContainer = styled.div`
  @media screen and (min-width: 1px) {
    &&& svg {
      margin: 0;
      cursor: default;
      color: ${(props) => (props.online ? "lightgreen" : "red")};
    }
  }

  display: flex;
  justify-content: center;
  
  width: 30%;
  font-size: ${Theme.fontSizeM};
  color: ${Theme.theme3.font.lightcolor};
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
  margin-right: 3px;
  transform: translateY(-4px);
`;


//styles for bottom portion of profile component
const ProfileInfoContainer = styled.div`
height: 60%; 
width: 100%;
display: flex;
padding: 2rem;
flex-direction: column;
margin: 0 auto;

`

const Bio = styled.span`
width: 70%;
height: 30%;
display: flex;
align-items: center;
text-align: center;
margin: 2.5rem auto 0 auto;
padding: .5rem;
font-size: 1.5rem;
background-color: ${Theme.theme3.opaqueBlack};

border-radius: ${Theme.borderRadius};

color: ${Theme.theme3.font.lightcolor};

`

const EmailAndDateJoinedContainer = styled.div`
width: 70%;
height: 15%;
display: flex;
align-items: center;
background-color: transparent;
font-size: 1.5rem;
margin: 2.5rem auto 0 auto;
justify-content: space-between;

`

const Email = styled.div`
margin-left: 2rem;
`

const DateJoined = styled.div`
margin-right: 2rem;
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
  bottom: 2rem;
  margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
  
  
  &:hover {
    border: 1px solid ${Theme.theme3.highlight2};
    box-shadow: 0 0 8px 2px ${Theme.theme3.highlight2};
  }
`;
const SettingsButton = styled.div`
  display: flex;
  justify-content: center;
 margin-top: auto;
 
  
  
  & svg {color: ${Theme.offWhite};
  transition: all ${Theme.transitionSpeed};
  margin: auto;
  &:hover {
    color: ${Theme.theme3.highlight2};
    cursor: pointer;
  }}
`;

export default function UserProfileModal({profileDisplayState,
    handleCloseProfile, profilePicURL, id, socket, user}) {const [displaySettings, setDisplaySettings] = useState(false); // Responsible for whether or not settings are shown

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
          <UserName>{user.displayName}</UserName>
          <StatusContainer online>
          <StatusCircle>
            <FaCircle size={10}></FaCircle>
          </StatusCircle>
          <StatusOnline online>Online</StatusOnline>
          <StatusOffline online>Offline</StatusOffline>
        </StatusContainer>
        </ProfilePicContainer>
      ) : (
        <ProfilePicContainer>
          <PicFormStyle onSubmit={submitHandler}>
            <PicLabel>
              {/* {" "} */}
              
              <FaUserSecret size={150} color={`${Theme.offWhite}`}></FaUserSecret>
              <PicInput type="file" name="file" id="files" ref={fileRef} />
              <PicInputLabel for="files">Browse for Profile Picture</PicInputLabel>
            </PicLabel>
            <Submit type="submit">submit</Submit>
          </PicFormStyle>
          <UserName>{user.displayName}</UserName>
          <StatusContainer online>
          <StatusCircle>
            <FaCircle size={10}></FaCircle>
          </StatusCircle>
          <StatusOnline online>Online</StatusOnline>
          <StatusOffline online>Offline</StatusOffline>
        </StatusContainer>
        </ProfilePicContainer>
      )}
      <ProfileInfoContainer>
        <Bio>I am a developer. Look! I wrote a bio. You can write one too, but you gotta make an account first. My bio is cool, don't you want a cool bio.</Bio>
        <EmailAndDateJoinedContainer>
<Email>Will.email@gmail.com</Email>
<DateJoined>Joined: 11/15/1996</DateJoined>

        </EmailAndDateJoinedContainer>
      {/* <SettingsContainer onClick={handleSettings}> */}
          <SettingsButton onClick={handleSettings}>
            <BsGearFill size={40} ></BsGearFill>
          </SettingsButton>
        {/* </SettingsContainer> */}
        </ProfileInfoContainer>
        </ProfileContainer>
    )
}
