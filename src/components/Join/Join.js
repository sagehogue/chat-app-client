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

const Heading = styled.h1`
  color: ${Theme.textColorDark};
  justify-self: flex-start;
  font-size: 2.5rem;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
  margin-top: 0;
  @media (min-width: 600px) and (max-height: 450px) {
    font-size: 2.25rem;
  }
`;

const Directive = styled.h3`
  color: ${Theme.textColorDark};
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  font-size: 1.75rem;
  @media (min-width: 600px) and (max-height: 450px) {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }
`;

const JoinInput = styled.input`
  border-radius: ${Theme.borderRadius};
  border: none;
  padding: 17px 22px;
  box-shadow: none;
  width: 100%;
  @media screen and (min-width: 1000px) {
    width: 75%;
  }
`;

const JoinModal = styled.div`
  margin: 1rem auto auto auto;
`;

const SignInButton = styled.button`
  color: ${Theme.textColorLight} !important;
  text-transform: uppercase;

  font-size: ${Theme.fontSizeS};
  text-decoration: none;
  background-color: ${Theme.colorHighlight};
  padding: 20px;
  border-radius: ${Theme.borderRadiusBtnL};
  display: inline-block;
  border: none;
  margin-top: 30px;
  width: 100%;
  cursor: pointer;
  transition: ${Theme.transitionSpeed};
  &:hover {
    scale: 1.1;

    box-shadow: 0.2rem 0.2rem 1.4rem rgba(0, 0, 0, 0.4);
  }
  & :focus {
    outline: 0;
  }
  @media screen and (min-width: 1000px) {
    width: 50%;
  }
`;

const Animation = styled.div`
  transition: 0.5s;
  /* example for move item */
  z-index: ${({ state }) =>
    state === "entering" || state === "entered" ? 1 : 0};
  /* change opacity*/
  opacity: ${({ state }) => {
    switch (state) {
      case "entering":
        return "1";
      case "entered":
        return "1";
      case "exiting":
        return "0";
      case "exited":
        return "0";
    }
  }};
  display: ${({ state }) => (state === "exited" ? "none" : "block")};
`;

const PublicRoomListHeader = styled.h3`
  margin-top: 15vh;
  color: ${Theme.textColorDark};
`;

const PublicRoomList = styled.section`
  margin-top: 5vh;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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
      noButton
    />
  ));
  return (
    <JoinOuterContainer>
      <JoinInnerContainer>
        <Heading>Welcome {user.displayName}!</Heading>
        <Directive>Enter the name of the room you wish to join.</Directive>
        <JoinModal>
          <JoinInput
            placeholder="Room"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* TEMPORARILY DISABLED - We're using ID now not text names. We'll have to create some kind of search menu here. */}
          <SignInButton
          //   type="submit"
          //   onClick={(e) => {
          //     if (room) {
          //       joinHandler(room);
          //     }
          //   }
          // }
          >
            Join Room
          </SignInButton>
        </JoinModal>
        <PublicRoomListHeader>
          Or jump into a conversation in an active public chat room.
        </PublicRoomListHeader>
        <ArrowDown size={40} />
        <PublicRoomList>
          {!!previewedRooms[0] == true ? (
            PublicRooms
          ) : (
            <NoRooms>
              It appears there are no populated rooms. Why don't you join one
              and invite someone to chat with?
            </NoRooms>
          )}
        </PublicRoomList>
      </JoinInnerContainer>
    </JoinOuterContainer>
  );
}
