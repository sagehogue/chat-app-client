import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";
const DisplayBox = styled.section`
  position: absolute;
  margin: auto;
  min-height: 75vh;
  min-width: 50vw;
  z-index: ${(props) => (props.shouldDisplay ? Theme.zIndex.modal : "0")};
  background-color: ${Theme.offWhite};
  font-family: ${Theme.font.type.body};
  color: ${Theme.font.color.body};
  font-size: ${Theme.font.size.bodyDesktop};
`;

export default function NewModal({ children, shouldDisplay }) {
  return <DisplayBox shouldDisplay={shouldDisplay}>{children}</DisplayBox>;
}
