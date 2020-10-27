import React from "react";
import styled from "styled-components";

const Frame = styled.div`
display: flex;
flex-direction: column;
height: 100%
overflow-y: scroll;
max-height: 90vh;
max-width: 20vw;

`;

export default function Cabinet({ children }) {
  return <Frame>{children}</Frame>;
}
