import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import GlobalStyle from "../UI/GlobalStyles/GlobalStyles";
import button from "../UI/Button/Button";

const StyledProfileBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #016789;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 60vh;
  width: 35vw;
  background: rgba(0, 0, 0, 0.3);

  border: 2px white solid;
  border-radius: 5px;
`;

const ProfilePic = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 7rem;
  font-size: 9rem;
`;

const StyledBio = styled.form`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 1.75rem;
  text-align: center;
`;

const ProfileButtons = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 3.5rem;
`;

const TempButtonName = styled.input`
  color: #fff;
  text-align: center;
  width: 4rem;
  height: 2rem;
  border: 1px #fff solid;
  border-radius: 2px;
  background-color: transparent;
  font-size: 1.25rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default function UserProfile({ userPic, userName, bio, props }) {
  return (
    <StyledProfileBackground>
      <StyledProfile>
        <GlobalStyle />
        <ProfilePic>
          <FaUserCircle />
          {(userPic, userName)}
        </ProfilePic>
        <StyledBio>
          this is where the bio goes
          {bio}
        </StyledBio>
        <ProfileButtons>
          <TempButtonName type="submit" value="test">
            {props}
          </TempButtonName>
          <TempButtonName type="submit" value="test2">
            {props}
          </TempButtonName>
          <TempButtonName type="submit" value="test3">
            {props}
          </TempButtonName>
        </ProfileButtons>
      </StyledProfile>
    </StyledProfileBackground>
  );
}
