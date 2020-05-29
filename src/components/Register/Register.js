import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../UI/Button/Button";

import Button from '../UI/Button/Button'

const RegisterButton = styled(Button)`
  margin-top: 2.5rem;
  width: 50%;
  background-image: linear-gradient(#e55e5e, #d62828);
  border: none;
`;

export default function Register({ clickHandler }) {
  return <RegisterButton onClick={clickHandler}>Register</RegisterButton>;
}
