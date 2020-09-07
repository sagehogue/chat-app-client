import React from "react";

import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

// TODOS:
// Implement event handler to join room
//

const Styles = styled.div`
  position: relative;
  background-color: ${Theme.offWhite};
  //   padding: 3rem 5rem;
  border-radius: 7px;
  min-height: 6rem;
  min-width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: ${Theme.offWhite};
`;

const UserCountStyles = styled.span`
  position: absolute;
  top: -1.2rem;
  left: 0;
  text-align: center;
`;

const RoomNameStyles = styled.span`
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  background-color: rgba(3, 3, 3, 0.7);
  display: block;
  margin-top: auto;
  font-size: 1.65rem;
`;

export default function RoomCard({ roomName, usercount, joinHandler }) {
  return (
    <Styles onClick={(e) => joinHandler(roomName)}>
      <RoomNameStyles>{roomName}</RoomNameStyles>
      <UserCountStyles>Online: {usercount}</UserCountStyles>
    </Styles>
  );
}