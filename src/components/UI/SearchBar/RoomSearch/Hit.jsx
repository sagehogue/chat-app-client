import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Theme from "../../../../util/Theme/Theme";

import { FaUserSecret, FaEnvelope, FaDoorOpen } from "react-icons/fa";
import { Highlight } from "react-instantsearch-dom";
import { RoomCard } from "../../RoomCard/RoomCard";

import { AuthContext } from "../../../../App";
import { emitJoin } from "../../../../pages/HomePage/HomePage";

const Card = styled.div`
  transition: transform 0.5s, color 0.2s;
  position: relative;
  min-height: 6rem;
  min-width: 4rem;
  border-radius: 8px;
  // border: 1px solid ${Theme.blueButtonColor};
  overflow: hidden;
  background-color: ${Theme.offWhite};
  &:nth-of-type(even) {
    // background-color: ${Theme.theme3.color2AccentA};
  }
  &:nth-of-type(odd) {
    // background-color: ${Theme.theme3.color2AccentB};
  }
`;

const Container = styled.div`
  margin: 0.5rem 0;
  // perspective: 1000;
  cursor: pointer;
  // padding: 0.25rem;
  transition: all 0.2s;
  &:hover {
    scale: 1.1;
  }
`;

const Name = styled.span`
  font-size: 0.9rem;
  color: ${Theme.offWhite};
  font-weight: 600;
  // background-color: rgba(50, 50, 50, 0.4);
`;

const TextBackground = styled.span`
  display: inline-block;
  color: ${Theme.offWhite};
  width: 100%;
  text-align: center;
  height: 2.7rem;
  background-color: rgba(50, 50, 50, 0.75);
  overflow: hidden;
`;

const RoomCreatorName = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  min-height: 0.75rem;
  font-weight: 400;
  margin-top: auto;
  font-size: 0.6rem;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  height: 1rem;
`;

const Face = styled.div`
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FrontFace = styled(Face)`
  position: relative;
`;

const Placeholder = styled.div`
  width: inherit;
  height: inherit;
  position: absolute;
  min-height: 5rem;
  min-width: 5rem;
  // max-width: 6rem;
  top: 60%;
  left: 0;
  z-index: 1;
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  margin: auto;
  & svg {
    margin: auto;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
// const BackFace = styled(Face)`
//   transform: ${(props) =>
//     props.flipCard ? "rotateX(0deg)" : "rotateX(180deg)"};
// background: ${(props) =>
//     props.avatar ? (props.avatar === "default" ? "" : props.avatar) : ""};
//   color: ${(props) => (props.flipCard ? "rgba(245, 245, 245, 0)" : "#fff")};
// `;

export default function Hit({ hit, handleClientJoin, closeHandler }) {
  let placeholder = (
    <Placeholder>
      <FaDoorOpen size={45} color={Theme.theme3.color1} />
    </Placeholder>
  );
  // let avatar;
  // if (hit.avatar) {
  //   avatar = (
  //     <img
  //       src={hit.avatar}
  //       className="hit-avatar"
  //       align="left"
  //       alt={hit.displayName}
  //     />
  //   );
  // }
  //   const [flipCard, setFlipCard] = useState(false);
  //   const hoverOn = () => {
  //     setFlipCard(true);
  //   };
  //   const hoverOff = () => {
  //     setFlipCard(false);
  //   };
  let user = useContext(AuthContext);
  // console.log(hit.avatar);
  return (
    <Container
      onClick={() => {
        emitJoin({
          room: {
            id: hit.objectID,
            roomName: hit.roomName,
            avatar: hit.avatar,
          },
          user: {
            displayName: user.displayName,
            id: user.uid,
          },
        });
        handleClientJoin({
          id: hit.id,
          roomName: hit.roomName,
          avatar: hit.avatar,
        });
        closeHandler();
      }}
    >
      <Card>
        <FrontFace
        //   flipCard={flipCard}
        >
          {hit.avatar ? <Avatar src={hit.avatar.url} /> : placeholder}
          <TextBackground>
            <Name className="hit-roomName">
              <Highlight attribute="roomName" hit={hit} />
            </Name>
            <RoomCreatorName>{`Created by ${hit.creator}`}</RoomCreatorName>
          </TextBackground>
        </FrontFace>
      </Card>
    </Container>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};
