import React, { useState, setState } from "react";
import styled from "styled-components";
import closeIcon from "../../icons/closeIcon.png";
import { FaNapster } from "react-icons/fa";

const ProfileContainer = styled.div`
  position: absolute;
  height: 40vh;
  width: 18vw;
  background-color: #333;
  margin-top: 3rem;

  border-radius: 1rem;
  cursor: default;
  display: ${(props) => (props.profileDisplayState == true ? "flex" : "none")};
  flex-direction: column;
`;

const ProfilePicContainer = styled.div`
  position: relative;
  height: 17vh;
  width: 18vw;
  background-color: lightgray;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileInfoContainer = styled.div`
position: relative;
padding-top: 2rem;
display: flex;
justify-content: space-around;
align items: center;
font-size: 2rem;`;

const CloseButton = styled.button`
  margin-top: 1rem;
  margin-left: 0.5rem;
  position: absolute;
  align-self: flex-start;
  z-index: 1;
  background-color: red;
  opacity: 0.7;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    opacity: 1;
    border: 1px solid black;
  }
`;

//to do:

// make online/offline display on profile
// add profile bio/bio display
// add logout button

export default function UserProfile({
  profileDisplayState,
  handleCloseProfile,
}) {
  return (
    <ProfileContainer profileDisplayState={profileDisplayState}>
      <CloseButton onClick={handleCloseProfile}>
        <img src={closeIcon} alt="close icon" />
      </CloseButton>
      <ProfilePicContainer>
        <FaNapster size={100} color={"black"}></FaNapster>
      </ProfilePicContainer>
      <ProfileInfoContainer>online bio logout</ProfileInfoContainer>
    </ProfileContainer>
  );
}
