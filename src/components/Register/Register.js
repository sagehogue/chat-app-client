import React from "react";
import styled from "styled-components";

const RegisterButton = styled.button`
  margin-top: 5rem;
  padding: 1.25rem;
  width: 100%;
  background-image: linear-gradient(#e55e5e, #d62828);
  color: #fff;
  box-shadow: none;
  border: none;
  border-radius: 0.275rem;
  font-size: 1rem;
  transition: all 0.15s;
  &:hover {
    transform: scale(1.1) translateY(-0.5rem);
    box-shadow: 0rem 0.15rem #333;
    background-image: linear-gradient(#c62d2d, #4c1818);
  }
`;

export default function Register() {
  return <RegisterButton>Register</RegisterButton>;
}
