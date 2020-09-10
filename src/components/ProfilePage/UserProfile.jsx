import React, { useState, setState } from "react";
import styled from "styled-components";
import closeIcon from "../../icons/closeIcon.png";
import button from "../../components/UI/Button/Button";
import { FaNapster, FaCircle } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";

const ProfileContainer = styled.div`
  position: absolute;
  height: 480px;
  width: 300px;

  margin-top: 4rem;
  background-color: #333;
  border-radius: 1rem;
  cursor: default;
  display: ${(props) => (props.profileDisplayState == true ? "flex" : "none")};
  flex-direction: column;
`;

const ProfilePicContainer = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
  background-color: lightgray;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const ProfileInfoContainer = styled.div`
//   position: relative;
//   padding-top: 2rem;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   font-size: 2rem;
//   height: 20vh;
// `;

const ProfileInfoContainer = styled.div`
  position: relative;
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  font-size: 1.5rem;
  height: 280px;
  background-color: #333;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  margin-left: 0.5rem;
  padding: 1px;
  position: absolute;
  align-self: flex-start;
  z-index: 1;
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
  display: inline-block;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 2;
  padding: 0;
  margin: 0;
`;

const ColorStatusPicker = styled.div`
  color: ${(props) => (props.online ? "green" : "red")};
`;

const SettingsContainer = styled.div`
  grid-row-start: 2;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 1;
  padding: none;
  margin: none;
`;

const LogOutButton = styled(button)`
  grid-row-start: 2;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 2;

  color: #fff;
  border: 1px #fff solid;
  background-color: black;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

//to do:

// make online/offline display on profile
// add profile bio/bio display
// add logout button

export default function UserProfile({
  profileDisplayState,
  handleCloseProfile,
  logoutHandler,
}) {
  return (
    <ProfileContainer profileDisplayState={profileDisplayState}>
      <CloseButton onClick={handleCloseProfile}>
        <img src={closeIcon} alt="close icon" />
      </CloseButton>
      <ProfilePicContainer>
        <FaNapster size={100} color={"black"}></FaNapster>
      </ProfilePicContainer>
      <ProfileInfoContainer>
        <StatusContainer>
          <ColorStatusPicker online>
            <FaCircle size={10} color={"lightgreen"} cursor="none"></FaCircle>
          </ColorStatusPicker>
          Online
        </StatusContainer>
        <SettingsContainer>
          <BsGearFill size={60} verticleAlign={"none"}></BsGearFill>
        </SettingsContainer>
        <LogOutButton onClick={() => logoutHandler()}>Log Out</LogOutButton>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
}
