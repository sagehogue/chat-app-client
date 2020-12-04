import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

const Style = styled.button`
  text-align: center;
  text-transform: uppercase;
  color: ${Theme.colors.offWhite};
  letter-spacing: 2px;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  padding: 0.7rem 2.5rem;
  background-color: ${Theme.theme3.color1};
`;

export const RoomSettingsSelect = styled(Style)`
  position: relative;
  display: block;
  margin: 1rem auto auto auto;
  background-color: ${Theme.theme3.color2AccentB};
`;

export default function Select({ children }) {
  return <Style>{children}</Style>;
}
