import React from "react";
import styled from "styled-components";

import Theme from "../../../util/Theme/Theme";

export default styled.button`
  display: inline-block;
  cursor: pointer;

  text-decoration: none;
  text-align: center;
  text-transform: uppercase;

  letter-spacing: 2px;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  padding: 0.7rem 1.25rem;
  font-family: ${Theme.font.type.button};
  color: ${Theme.colors.offWhite};
  background-color: ${Theme.theme3.color2};
  transition: all ${Theme.transitionSpeed};

  outline: none;
  border: none;
  &:hover {
    background-color: ${Theme.theme3.highlight};
    color: ${Theme.offBlack};
    // transform: scale(1.1);
    // box-shadow: 0 8px 6px rgba(3, 3, 3, 0.5);
  }
  &:focus {
  }
  &:active {
    transform: translateY(0.25rem);
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
