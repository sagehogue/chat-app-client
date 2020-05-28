import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../UI/Button/Button";

const RegisterButton = styled(SubmitButton)`
  margin-top: 2rem;
  padding: 1.25rem;
  width: 50%;
  background-image: linear-gradient(#e55e5e, #d62828);
  color: #fff;
  box-shadow: none;
  border: none;
  border-radius: 0.275rem;
  font-size: 1rem;
  transition: all 0.15s;
  outline: none;
  &:hover {
    transform: scale(1.1) translateY(-0.5rem);
  }
`;

export default function Register({ clickHandler }) {
  return <RegisterButton onClick={clickHandler} value="register" />;
}
