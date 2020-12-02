import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Theme from "../../../../util/Theme/Theme";

import {
  FaUserSecret,
  FaEnvelope,
  FaDoorOpen,
  FaMinus,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { Highlight } from "react-instantsearch-dom";
import { RoomCard } from "../../RoomCard/RoomCard";

import { AuthContext } from "../../../../App";
import { emitJoin } from "../../../../pages/HomePage/HomePage";

const Card = styled.div`
  position: relative;
  background-color: ${Theme.offWhite};
  transition: all ${Theme.transitionSpeed};
  //   padding: 3rem 5rem;
  border-radius: 7px;
  margin: 1rem;
  padding: 0.325rem;
  min-height: 6rem;
  min-width: 8rem;
  max-width: 20rem;
  margin-top: 0.5rem;
  overflow: hidden;
  color: ${Theme.offWhite};
  flex-grow: 0.25;
  flex-shrink: 1;
  margin: 0.5rem;
  border: 1px transparent solid inset;
  &:hover {
    border: 1px solid ${Theme.theme3.highlight2} inset;
    box-shadow: 0 0 8px 2px ${Theme.theme3.highlight2};
    & svg {
      color: ${Theme.theme3.color2};
    }
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

const Content = styled.div`
  display: flex;
  justify-content: space-around;

  color: ${Theme.colors.primary};

  & > svg:nth-of-type(2) {
    margin-left: auto;
  }
  & svg {
    transition: ${Theme.animations.buttonHoverEffectTransition};
    z-index: 3;
    color: transparent;
  }
`;

const RoomName = styled.span`
  min-height: 1.5rem;
  padding: 0.15rem 0.25rem 0.15rem 0.25rem;
  // border: 1px solid ${Theme.colors.mostlyTransparentBlack};
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.25rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  word-wrap: break-word;
  font-weight: 600;
  background-color: ${Theme.colors.mostlyTransparentBlack};
  vertical-align: middle;
`;

const Center = styled.div`
  color: ${Theme.colors.accentMedium};

  display: flex;
  justify-content: center;
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

  let user = useContext(AuthContext);
  // console.log(hit.avatar);
  const oldDesign = (
    <Container>
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

  return (
    <Card
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
      {hit.avatar ? (
        <Avatar src={hit.avatar.url} />
      ) : (
        <Center>
          <FaDoorOpen size={60} color={Theme.theme3.color1} />
        </Center>
      )}
      <Content>
        {/* <FaEllipsisH size={20} /> */}
        <RoomName>
          <Name className="hit-roomName">
            <Highlight attribute="roomName" hit={hit} />
          </Name>
        </RoomName>
        {/* {hit.isFavorite ? (
          <FaRegStar
            onClick={(e) => {
              e.stopPropagation();
              removeFavorite(userID, id);
            }}
            size={20}
          />
        ) : (
          <FaStar
            onClick={(e) => {
              e.stopPropagation();
              addFavorite(userID, id);
            }}
            size={20}
          />
        )}
        <FaMinus
          size={20}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveSavedRoom(userID, id);
          }}
        /> */}
      </Content>
    </Card>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};
