import React from "react";
import styled from "styled-components";

export default styled.button`
  display: inline-block;
  padding: 0.6rem;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: all 0.3s;
  color: #fff;
  outline: none;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 6px rgba(3, 3, 3, 0.5);
  }
  &:focus {
    outline: none;
    border: none;
  }
  &:active {
    transform: scale(1.1) translateY(-0.25rem);
    outline: none;
    border: none;
  }
`;

export const SubmitButton = styled.input`
  display: inline-block;
  padding: 1.25rem;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.15s;
  color: #fff;
  outline: none;
  &:hover {
    transform: scale(1.1) translateY(-0.5rem);
    box-shadow: 0 8px 6px rgba(3, 3, 3, 0.5);
  }
  &:focus {
    outline: none;
    border: none;
  }
  &:active {
    transform: scale(1.05) translateY(-0.25rem);
    box-shadow: 0 6px 4px rgba(3, 3, 3, 0.75);
    outline: none;
    border: none;
  }
`;
