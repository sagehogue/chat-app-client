import React, { useState, setState } from "react";
import styled from "styled-components";
import Theme from "../../util/Theme/Theme";
import { TiArrowBack } from "react-icons/ti";
import button from "../UI/Button/Button";
import SettingsOption from "../../components/UI/Settings/SettingsOption";

const SettingsElementMain = styled.div`
  position: absolute;
  height: 35rem;
  width: 20rem;
  display: ${(props) => (props.settingsActive ? "flex" : "none")};
  z-index: 1;
  background-color: ${Theme.backgroundColorDarkGray};
  border-radius: 1rem;
  justify-content: center;
  text-align: center;
  text-decoration: underline;
  text-transform: capitalize;
`;

const SettingsElementOptions = styled.div`
  position: absolute;
  padding-top: 3rem;

  height: 35rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-radius: 1rem;
  justify-content: center;
  text-align: center;
  font-size: ${Theme.fontSizeM};
  overflow-y: scroll;
`;

const BackArrow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 3rem;
  padding-left: .125rem;
  height: 2rem;
  &&& svg {
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

  cursor: pointer;
  &:hover {
    background-color: ${Theme.backgroundColorDarkerGray};
  }
`;

export default function Settings({
  settingsActive,
  handleRevertToProfile,
  logoutHandler,
}) {
  return (
    <SettingsElementMain settingsActive={settingsActive}>
      settings
      <SettingsElementOptions>
        <BackArrow onClick={handleRevertToProfile}>
          <TiArrowBack size={25}></TiArrowBack>
        </BackArrow>
        <DisplayStatus>display status</DisplayStatus>
        <SettingsOptionTest>font size</SettingsOptionTest>
        <SettingsOptionTest1>Change Profile Picture</SettingsOptionTest1>
        <SettingsOptionTest2>test</SettingsOptionTest2>
        <SettingsOptionTest2>test</SettingsOptionTest2>

        <SettingsOptionTest3>testies</SettingsOptionTest3>
        <SettingsOptionTest4>more test</SettingsOptionTest4>
        <LogOutButton onClick={() => logoutHandler()}>Log Out</LogOutButton>
      </SettingsElementOptions>
    </SettingsElementMain>
  );
}
