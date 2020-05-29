import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../UI/Button/Button";

<<<<<<< HEAD
const RegisterButton = styled(SubmitButton)`
  margin-top: 2rem;
  padding: 1.25rem;
=======
import Button from '../UI/Button/Button'

const RegisterButton = styled(Button)`
  margin-top: 2.5rem;
>>>>>>> 87298f7176a4b352441bf9995078e2486b6f7abc
  width: 50%;
  background-image: linear-gradient(#e55e5e, #d62828);
  border: none;
<<<<<<< HEAD
  border-radius: 0.275rem;
  font-size: 1rem;
  transition: all 0.15s;
  outline: none;
  &:hover {
    transform: scale(1.1) translateY(-0.5rem);
  }
=======
>>>>>>> 87298f7176a4b352441bf9995078e2486b6f7abc
`;

export default function Register({ clickHandler }) {
  return <RegisterButton onClick={clickHandler} value="register" />;
}
