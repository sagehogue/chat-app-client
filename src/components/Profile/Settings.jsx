import React, { useState, setState } from "react";
import styled from "styled-components";
import { TiArrowBack } from "react-icons/ti";

const SettingsElementMain = styled.div`
  position: absolute;
  height: 35rem;
  width: 20rem;
  display: ${(props) => (props.settingsActive ? "flex" : "none")};
  z-index: 1;
  background-color: #333;
  border-radius: 1rem;
  justify-content: center;
  text-align: center;
`;

const SettingsElementOptions = styled.div`
  position: absolute;
  padding-top: 10rem;
  height: 35rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-radius: 1rem;
  justify-content: space-center;
  text-align: center;
  font-size: 2rem;
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

export default function Settings({ settingsActive, handleRevertToProfile }) {
  return (
    <SettingsElementMain settingsActive={settingsActive}>
      settings
      <SettingsElementOptions>
        <BackArrow onClick={handleRevertToProfile}>
          <TiArrowBack size={25}></TiArrowBack>
        </BackArrow>
        test
      </SettingsElementOptions>
    </SettingsElementMain>
  );
}
