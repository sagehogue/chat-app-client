import React, { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Theme from "../../../../util/Theme/Theme";
import { FaUserSecret, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../../../../App";

import { emitJoin } from "../../../../pages/HomePage/HomePage";

import { Highlight } from "react-instantsearch-dom";

const Card = styled.div`
  transition: transform 0.5s, color 0.2s;
  position: relative;
  // transform-style: preserve-3d;
  min-height: 4rem;
  min-width: 4rem;
  max-width: 8rem
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  //   &:hover {
  //     max-height: 4rem;
  //     transform: rotateY(180deg);
  //     box-shadow: -5px 5px 5px #aaa;
  //   }
  &:nth-of-type(even) {
    background-color: ${Theme.colors.accentLight};
  }
  &:nth-of-type(odd) {
    background-color: ${Theme.colors.accentExtraLight};
  }
`;

const Container = styled.div`
  margin: 0.5rem 0;
  perspective: 1000;
`;

const Name = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  min-height: 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: rgba(50, 50, 50, 0.4);
`;

const RoomCreatorName = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  min-height: 0.75rem;
  font-weight: 400;
  margin-top: auto;
  font-size: 0.75rem;
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

const FrontFace = styled(Face)``;
// const BackFace = styled(Face)`
//   transform: ${(props) =>
//     props.flipCard ? "rotateX(0deg)" : "rotateX(180deg)"};
// background: ${(props) =>
//     props.avatar ? (props.avatar === "default" ? "" : props.avatar) : ""};
//   color: ${(props) => (props.flipCard ? "rgba(245, 245, 245, 0)" : "#fff")};
// `;

export default function Hit({ hit, handleClientJoin, closeHandler }) {
  let avatar;
  if (hit.avatar) {
    avatar = (
      <img
        src={hit.avatar}
        className="hit-avatar"
        align="left"
        alt={hit.displayName}
      />
    );
  }
  //   const [flipCard, setFlipCard] = useState(false);
  //   const hoverOn = () => {
  //     setFlipCard(true);
  //   };
  //   const hoverOff = () => {
  //     setFlipCard(false);
  //   };
  let user = useContext(AuthContext);
  return (
    <Container
      onClick={() => {
        emitJoin({
          room: {
            id: hit.id,
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
          avatar={hit.avatar ? hit.avatar : "default"}
        >
          <Name className="hit-roomName">
            <Highlight attribute="roomName" hit={hit} />
          </Name>
          <RoomCreatorName>{`Created by ${hit.creator}`}</RoomCreatorName>
          {/* <h4>
            Owned By: <Highlight attribute={"creator"} hit={hit} />
          </h4> */}
        </FrontFace>
        {/* <BackFace flipCard={flipCard}>
          <h5>Members: {hit.members.length}</h5>
        </BackFace> */}

        {/* //   <UserPicture>{avatar}</UserPicture>
    //   
    //   <UserDetails className="hit-description">
    //     <Highlight attribute="description" hit={hit} />
    //   </UserDetails>
    //   <Controls>
    //     <FaEnvelope size={15} />
    //   </Controls> */}
      </Card>
    </Container>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};
