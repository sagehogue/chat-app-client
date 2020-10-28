import React from "react";
import styled from "styled-components";

import Modal from "../../UI/Modal/NewModal";

import Theme from "../../../util/Theme/Theme";

const Heading = styled.h1`
  display: block;
  text-align: center;
  margin: 2rem 0;
  font-family: ${Theme.font.type.heading};
  color: ${Theme.font.color.heading};
  font-size: ${Theme.font.size.headingDesktop};
`;

export default function RoomSettings({ shouldDisplay }) {
  return (
    <Modal shouldDisplay={shouldDisplay}>
      <Heading>Room Settings</Heading>
    </Modal>
  );
}
