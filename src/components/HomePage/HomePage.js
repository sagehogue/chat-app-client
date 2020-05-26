import React from "react";
import styled from "styled-components";

import GlobalStyle from "../GlobalStyles/GlobalStyles";

const HomePageBackground = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #016789;
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
  return (
    <div>
      <GlobalStyle />

      <HomePageBackground>
        <HomePageSelectorContainer>
          <HomePageChatContainer></HomePageChatContainer>
        </HomePageSelectorContainer>
      </HomePageBackground>
    </div>
  );
}
