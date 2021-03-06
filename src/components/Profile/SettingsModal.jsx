import React, { useState, useEffect, createRef } from 'react'
import styled from 'styled-components'
import Theme from '../../util/Theme/Theme'
import { Modal } from "../../components/UI/Modal/NewModal";
import { TiArrowBack } from "react-icons/ti";
import button from "../UI/Buttons/Button";
import Submit from "../UI/Buttons/SubmitButton";
import SettingsOption from "../../components/UI/Settings/SettingsOption";
import uuid from "react-uuid";
import { getStorageRef } from "../../App";

const SettingsContainer = styled(Modal)`
position: relative;
  height: 100%;
  width: 100%;
  display: ${(props) => (props.settingsActive ? "flex" : "none")};
  background-color: ${Theme.theme3.color5};
  border-radius: ${Theme.borderRadius};
  cursor: default;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  text-transform: capitalize;
  
`;

const SettingsHeader = styled.div`
font-size: 3rem;
color: ${Theme.offWhite};
padding: .25rem;
width: 40%;
margin: 0 auto;
border-bottom: 2px solid ${Theme.offWhite};
`



const SettingsComponent = styled.div`
  position: absolute;
  padding-top: 1rem;
width: 100%;
  height: 87vh;
  
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  justify-content: center;
  text-align: center;
  font-size: ${Theme.fontSizeM};
`;



const SettingsElementOptions = styled.div`
margin-top: 2rem;
display: flex;
flex-direction: column;
height: 65vh;


`;

const BackArrow = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  padding-top: 1.125rem;
  padding-left: 1.125rem;
  height: 2rem;
  transition: ${Theme.transitionSpeed};
  display: flex;
  justify-content: flex-end;
  color: ${Theme.offWhite};
  
  & svg {
    margin: 0;
    cursor: pointer;
    
  }

  &:hover {
    color: ${Theme.theme3.highlight2};
  }
}`;

const SettingsOptionEven = styled(SettingsOption)`
background-color: ${Theme.theme3.cabinetEven}
`

const DisplayStatus = styled(SettingsOption)``;
const ChangeProPic = styled(SettingsOption)``;

const FontSize = styled(SettingsOptionEven)``;
const SettingsOptionTest1 = styled(SettingsOption)``;
const SettingsOptionTest2 = styled(SettingsOptionEven)``;
const SettingsOptionTest3 = styled(SettingsOption)``;
const SettingsOptionTest4 = styled(SettingsOption)``;

const LogOutButton = styled(SettingsOptionEven)`
  
`;

//styling for changing profile picture settings option below

const ProfilePicContainer = styled.div`
  position: relative;
  height: 87vh;
  width: 100%;
  background-color: ${Theme.theme3.color5};
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
  color: ${Theme.offWhite};
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${Theme.fontSizeXL};

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
  width: 20%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.5rem;
  cursor: pointer;
`;

export default function Settings({
  settingsActive,
  handleRevertToProfile,
  logoutHandler,
  socket,
  id,
  profilePicURL,
}) {
  const [showSettingForm, setShowSettingForm] = useState(false);
  const [profilePic, setProfilePic] = useState(profilePicURL);

  useEffect(() => {
    setProfilePic(profilePicURL);
  }, [profilePicURL]);

  const handleOpenSettingForm = (setting) => {
    setShowSettingForm(setting);
  };
  const handleCloseSettingForm = () => {
    setShowSettingForm(false);
  };

  const fileRef = createRef();
  const storageRef = getStorageRef();
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
      console.log(profilePicRef.getDownloadURL());
      handleCloseSettingForm()
    });
  };

  const settings = (
   
    <SettingsComponent>
      <SettingsHeader>Settings</SettingsHeader>
      <BackArrow onClick={handleRevertToProfile}>
        <TiArrowBack size={35}></TiArrowBack>
      </BackArrow>
      <SettingsElementOptions>
      <DisplayStatus>Display Status</DisplayStatus>
      <FontSize>Font Size</FontSize>
      <ChangeProPic
        onClick={() => {
          handleOpenSettingForm("profile");
        }}
      >
        Change Profile Picture
      </ChangeProPic>
      <SettingsOptionTest2>Placeholder</SettingsOptionTest2>
      <SettingsOptionTest3>Placeholder</SettingsOptionTest3>
      <LogOutButton onClick={() => logoutHandler()}>Log Out</LogOutButton>
      </SettingsElementOptions>
    </SettingsComponent>
 
  );

  const changeAvatarOptionForm = (
    <>
      <BackArrow onClick={handleCloseSettingForm}>
        <TiArrowBack size={35}></TiArrowBack>
      </BackArrow>
      <ProfilePicContainer>
        <PicFormStyle onSubmit={submitHandler}>
          <PicLabel>
            Change Profile Pic
            <PicInput type="file" name="file" ref={fileRef} />
          </PicLabel>
          <Submit type="submit">submit</Submit>
        </PicFormStyle>
      </ProfilePicContainer>
    </>
  );

  return (
    <SettingsContainer settingsActive={settingsActive}>
      {showSettingForm ? (
        showSettingForm === "profile" ? (
          changeAvatarOptionForm
        ) : (
          <div>Not profile JSX</div>
        )
      ) : (
        settings
      )}
    </SettingsContainer>
  );
}