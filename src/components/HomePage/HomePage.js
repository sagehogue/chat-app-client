import React from "react";
import styled from "styled-components";

import { Redirect } from "react-router";

import button from "../UI/Button/Button";
import GlobalStyle from "../GlobalStyles/GlobalStyles";

const HomePageBackground = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #016789;
`;
const LogOutButton = styled(button)`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 3rem;
  margin-right: 3rem;
  color: black;
`;

const HomeNavBar = styled.nav`
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  height: 15vh;
  background: rgba(0, 0, 0, 0.6);
`;
const HomePageSelectorContainer = styled.div`
  height: 85vh;
  width: 80vw;
  background: #0090c1;
`;

const HomePageChatContainer = styled.div`
  margin: auto;
  height: 85vh;
  width: 60vw;
  background: #55d2fc;
`;

export default function HomePage() {
  let redirect;
  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <GlobalStyle />

      <HomePageBackground>
        <LogOutButton>Log Out</LogOutButton>
        <HomePageSelectorContainer>
          <HomePageChatContainer></HomePageChatContainer>
        </HomePageSelectorContainer>
      </HomePageBackground>
    </div>
  );
}
