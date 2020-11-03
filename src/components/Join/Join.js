import React, { useState } from "react";

import styled from "styled-components";
import { AiOutlineArrowDown } from "react-icons/ai";
import RoomCard from "../UI/RoomCard/RoomCard";
// import AnimateComponent from "../UI/Animations/AnimateComponent/AnimateComponent";

import Theme from "../../util/Theme/Theme";

// I think I'm going to fix this by splitting the logic and visual elements up.
// I need to be able to animate the elements properly without interrupting the flow of data.
//

const JoinOuterContainer = styled.div`
  display: flex;
  grid-row: ${Theme.gridRowChat};
  grid-column: ${Theme.gridColChat};
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto;
  @media screen and (max-height: 400px) {
    max-height: 75vh;
  }

  @media (min-width: 600px) and (max-height: 450px) {
    // max-height: 60vh;
  }
`;

const JoinInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  // height: 83vh;
  width: 55vw;
  margin: auto;
`;

const HeaderContainer = styled.div`
  display: inline-block;
  width: 50%;
  margin: 0 auto;
  border: 2px solid ${Theme.colorHighlight};
  border-radius: ${Theme.borderRadiusXL};
  background-color: ${Theme.backgroundColorLighterGray};
  padding: 1rem;
  margin-bottom: 5rem;
  box-shadow: 0.2rem 0.2rem 1.4rem rgba(0, 0, 0, 0.4);
`;

const Header = styled.h1`
  color: ${Theme.textColorDark};
  margin-right: 0.6vw;
  transition: all 1s;
  font-weight: 200;
  font-size: 3rem;
`;

const Title = styled.h1`
  background: -webkit-linear-gradient(#f58ea4, #f51444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  font-size: 4rem;
`;

// const Animation = styled.div`
//   transition: 0.5s;
//   /* example for move item */
//   z-index: ${({ state }) =>
//     state === "entering" || state === "entered" ? 1 : 0};
//   /* change opacity*/
//   opacity: ${({ state }) => {
//     switch (state) {
//       case "entering":
//         return "1";
//       case "entered":
//         return "1";
//       case "exiting":
//         return "0";
//       case "exited":
//         return "0";
//     }
//   }};
//   display: ${({ state }) => (state === "exited" ? "none" : "block")};
// `;

const PublicRoomListHeader = styled.h3`
  margin-top: 15vh;
  color: ${Theme.textColorDark};
`;

const PublicRoomList = styled.section`
  margin-top: 5vh;
  display: flex;
  justify-content: center;
`;

const ArrowDown = styled(AiOutlineArrowDown)`
  margin: 1rem auto 0 auto;
  display: block;
  color: ${Theme.colorHighlight};
`;

const NoRooms = styled.div`
  color: ${Theme.textColorDark};
  text-align: center;
  margin: 5rem auto 0 auto;
`;
//some of this code below is unnecessary and exists as a consequence of the initial chat app, not our production.

export default function JoinInternals({ user, joinHandler, previewedRooms }) {
  const [room, setRoom] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //   do validation
      if (room) {
        // joinHandler(room.trim());
      }
    }
  };
  let PublicRooms = previewedRooms.map((room) => (
    <RoomCard
      roomName={room.roomName}
      id={room.id}
      usercount={room.online}
      joinHandler={joinHandler}
      user={user}
    />
  ));
  return (
    <JoinOuterContainer>
      <JoinInnerContainer>
        <HeaderContainer>
          <Header>Welcome to </Header>
          <Title> ChatAppName</Title>
        </HeaderContainer>
        <PublicRoomListHeader>
          Jump into a conversation in an active public chat room.
        </PublicRoomListHeader>
        <ArrowDown size={44} />
        <PublicRoomList>
          {!!previewedRooms[0] == true ? (
            PublicRooms
          ) : (
            <NoRooms>
              It appears there are no populated rooms. Why don't you create one
              and invite someone to chat with?
            </NoRooms>
          )}
        </PublicRoomList>
      </JoinInnerContainer>
    </JoinOuterContainer>
  );
}
