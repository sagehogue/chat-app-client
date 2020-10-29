import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

const Styles = styled.div`
  padding: 0.5rem;
  margin: auto;
  height: 60vh;
  width: 50vw;
  background-color: ${Theme.colors.offWhite};
  z-index: ${(props) => (props.visible ? Theme.zIndex.modal : "-1")};
  top: 15%;
  left: 25%;

  @media screen and (min-width: 800px) {
    min-height: 75vh;
  }
`;

const Wrapper = styled.div``;

export default function Modal({ visible, children }) {
  return <Styles visible={visible}>{children}</Styles>;
}
