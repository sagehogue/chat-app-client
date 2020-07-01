import React from "react";
import styled from "styled-components";

import { SubmitButton } from "../../../components/UI/Button/Button";

// ${props =>
//   props.loggedIn ? "background-color: green" : "background-color: red"};

const SignInButtonStyle = styled(SubmitButton)`
  background-image: linear-gradient(#0090c1, #4099b7);
  width: 80%;
  margin-top: 2rem;
  border: none;
  text-align: center;
  &:focus {
    outline: none;

  }
`;

export default function SignIn() {
  return (
    <SignInButtonStyle type="submit" value={"Sign In"}>

    </SignInButtonStyle>
  );
}
