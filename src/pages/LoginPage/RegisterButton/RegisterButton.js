import React from "react";
import styled from "styled-components";
import Button from "../../../components/UI/Button/Button";


const RegisterButtonStyle = styled(Button)`
  margin-top: 2.5rem;
  width: 65%;
  background-image: linear-gradient(#e55e5e, #d62828);
  border: none;
`;

export default function RegisterButton({ clickHandler }) {
  return <RegisterButtonStyle onClick={clickHandler}>Register</RegisterButtonStyle>;
}
