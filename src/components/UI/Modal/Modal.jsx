import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

const Styles = styled.div`
  margin: auto;
  min-height: 75vh;
  min-width: 50vw;
  background-color: ${Theme.offWhite};
  z-index: ${(props) => (props.visible ? "100" : "-1")};
  position: absolute;
  top: 15%;
  left: 25%;
`;

const Wrapper = styled.div``;

export default function Modal({ visible, children }) {
  return <Styles visible={visible}>{children}</Styles>;
}
