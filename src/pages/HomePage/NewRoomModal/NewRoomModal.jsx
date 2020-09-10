import React from "react";
import styled from "styled-components";

import Modal from "../../../components/UI/Modal/Modal";

const Styles = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

export default function NewRoomModal({ visible }) {
  return (
    <Styles visible={visible}>
      <h4>Create New Room</h4>
    </Styles>
  );
}
