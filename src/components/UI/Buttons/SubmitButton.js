import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

const SubmitButton = styled.button`
  width: 50%;
  border: none;
  border-radius: ${Theme.borderRadiusBtn};
  margin: 2rem auto;
  cursor: pointer;
  padding: 1rem;

  background-color: ${Theme.offWhite};
  color: ${Theme.theme3.black};
  font-size: ${Theme.fontSizeM};

  transition: all ${Theme.transitionSpeed};
  font-family: ${Theme.font.button};
  font-weight: bold;
  letter-spacing: 6px;
  text-transform: uppercase;
  &:hover {
    background-color: ${Theme.theme3.highlight2};
  }
`;

export default SubmitButton;
