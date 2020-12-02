import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

export const Modal = styled.section`
  z-index: ${(props) => (props.shouldDisplay ? Theme.zIndex.modal : "0")};
  height: ${Theme.ui.modalHeight};
 width: ${Theme.ui.modalWidth};
  background-color: ${Theme.offWhite};
  box-shadow: ${Theme.theme3.boxShadow};
  font-family: ${Theme.font.type.body};
  color: ${Theme.font.color.body};
  font-size: ${Theme.font.size.bodyDesktop};
  display: ${(props) => (props.shouldDisplay ? "flex" : "none")};
  grid-column: 2 / 3;
  grid-row: 2 / 10;
 margin: auto;
`;
