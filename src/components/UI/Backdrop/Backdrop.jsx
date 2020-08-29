import React from "react";
import styled from "styled-components";

const BackdropStyle = styled.div`
  background-color: #000;
  opacity: ${(props) => (props.visible ? "0.5" : "0")};
  width: 100vw;
  height: 100vh;
  z-index: ${(props) => (props.visible ? "10" : "-1")};
  position: absolute;
  top: 0;
  left: 0;
`;

export default function Backdrop({ visible, closeBackdrop }) {
  return <BackdropStyle visible={visible} onClick={closeBackdrop} />;
}

const BackdropContext = React.createContext();
export const {
  BackdropContextProvider,
  BackdropContextConsumer,
} = BackdropContext;
