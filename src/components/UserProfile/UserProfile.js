import React from "react";
import styled from "styled-components";

const StyledProfile = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: red;
`;

export default function UserProfile() {
  return <StyledProfile>profile pic bio</StyledProfile>;
}
