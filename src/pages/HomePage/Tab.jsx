import React from "react";
import styled from "styled-components";

const TabStyle = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
  width: 100%;
`;

export default function Tab({ children }) {
  return <TabStyle>{children}</TabStyle>;
}
