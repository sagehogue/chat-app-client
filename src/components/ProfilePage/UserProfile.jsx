import React, { useState, setState } from "react";
import styled from "styled-components";
import closeIcon from "../../icons/closeIcon.png";
import button from "../../components/UI/Button/Button";
import { FaNapster, FaUserCircle } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";

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
  background-color: lightgray;
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
  @media screen and (min-width: 1px) {
    &&& svg {
      margin: 0;
    }
  }

  display: flex;

  justify-content: flex-start;
  width: 30%;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const Status = styled.div`
  display: inline-block;
`;

const StatusCircle = styled.div`
  width: 25%;
`;

const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 7rem;
  margin-right: 3rem;
`;

const LogOutButton = styled(button)`
  color: #fff;
  border: 1px #fff solid;
  background-color: black;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

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
        <StatusContainer online>
          <StatusCircle>
            <FaUserCircle
              size={10}
              color={"lightgreen"}
              cursor="none"
            ></FaUserCircle>
          </StatusCircle>
          <Status>Online</Status>
        </StatusContainer>
        <SettingsContainer>
          <BsGearFill style={{}} size={60} verticleAlign={"none"}></BsGearFill>
          <LogOutButton onClick={() => logoutHandler()}>Log Out</LogOutButton>
        </SettingsContainer>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
}
