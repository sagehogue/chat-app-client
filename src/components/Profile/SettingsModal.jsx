import React, { useState, useEffect, createRef } from 'react'
import styled from 'styled-components'
import Theme from '../../util/Theme/Theme'
import { Modal } from "../../components/UI/Modal/NewModal";
import { TiArrowBack } from "react-icons/ti";
import button from "../UI/Buttons/Button";
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
  text-decoration: underline;
  text-transform: capitalize;
  
`;



const SettingsElementOptions = styled.div`
  position: absolute;
  padding-top: 1rem;

  height: 87vh;
  
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  justify-content: center;
  text-align: center;
  font-size: ${Theme.fontSizeM};
`;

const SettingElementOption = styled.div`
  position: absolute;
  padding-top: 3rem;
  display: ${(props) => (props.settingsActive ? "flex" : "none")};
  height: 35rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  background-color: ${Theme.backgroundColorDarkGray};
  border-radius: 1rem;
  justify-content: center;
  text-align: center;
  font-size: ${Theme.fontSizeM};
`;

const BackArrow = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  padding-top: 3rem;
  padding-left: .125rem;
  height: 2rem;
  
  & svg {
    margin: 0;
    cursor: pointer;
    
  }
  opacity: 0.8;
  display: flex;
  justify-content: flex-end;
  &:hover {
    opacity: 1;
    transform: translateY(-1px);
    
  }
}`;

const DisplayStatus = styled(SettingsOption)``;
const ChangeProPic = styled(SettingsOption)``;

const SettingsOptionTest = styled(SettingsOption)``;
const SettingsOptionTest1 = styled(SettingsOption)``;
const SettingsOptionTest2 = styled(SettingsOption)``;
const SettingsOptionTest3 = styled(SettingsOption)``;
const SettingsOptionTest4 = styled(SettingsOption)``;

const LogOutButton = styled(button)`
  color: ${Theme.textColorLight};
  border: 1px #fff solid;
  background-color: ${Theme.backgroundColorDarkGray};
  color: ${Theme.textColorLight};
  width: 50%;
  margin: 0 auto;
  margin-bottom: 2rem;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: ${Theme.backgroundColorDarkerGray};
    color: ${Theme.theme3.highlight2};
    border: 1px solid ${Theme.theme3.highlight2};
    transform: scale(1) translateY(-2px);
  }
  &:active {
    transform: translateY(1px);
  }
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

const PicInput = styled.input`
  border: none;
  background: ${Theme.backgroundColorLigjtGray};
  color: ${Theme.textColorLight};
  width: 80%;
  margin-left: 3rem;
  margin-top: 0.5rem;
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
    });
  };

  const settingsOptions = (
    <SettingsElementOptions>
      <BackArrow onClick={handleRevertToProfile}>
        <TiArrowBack size={25} color={"#fff"}></TiArrowBack>
      </BackArrow>
      <DisplayStatus>display status</DisplayStatus>
      <SettingsOptionTest>font size</SettingsOptionTest>
      <ChangeProPic
        onClick={() => {
          handleOpenSettingForm("profile");
        }}
      >
        Change Profile Picture
      </ChangeProPic>
      <SettingsOptionTest2>test</SettingsOptionTest2>
      <SettingsOptionTest2>test</SettingsOptionTest2>
      <SettingsOptionTest3>testies</SettingsOptionTest3>
      <SettingsOptionTest4>more test</SettingsOptionTest4>
      <LogOutButton onClick={() => logoutHandler()}>Log Out</LogOutButton>
    </SettingsElementOptions>
  );

  const changeAvatarOptionForm = (
    <>
      <BackArrow onClick={handleCloseSettingForm}>
        <TiArrowBack size={25}></TiArrowBack>
      </BackArrow>
      <ProfilePicContainer>
        <PicFormStyle onSubmit={submitHandler}>
          <PicLabel>
            Change Profile Pic
            <PicInput type="file" name="file" ref={fileRef} />
          </PicLabel>
          <SubmitPic type="submit">submit</SubmitPic>
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
        settingsOptions
      )}
    </SettingsContainer>
  );
}