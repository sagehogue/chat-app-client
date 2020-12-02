import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Theme from "../../../../util/Theme/Theme";
import { FaUserSecret, FaEnvelope, FaUserPlus } from "react-icons/fa";

import { Highlight } from "react-instantsearch-dom";

const Style = styled.div`
  transition: all 0.35s;
  display: grid;
  grid-template-rows: 2fr 2fr 1fr;
  grid-template-columns: repeat(5, 1fr);
  max-height: 2.5rem;
  overflow: hidden;
  padding: 0.25rem;

  &:hover {
    max-height: 4rem;
  }
  // &:nth-of-type(even) {
  //   background-color: ${Theme.colors.accentLight};
  // }
  // &:nth-of-type(odd) {
  //   background-color: ${Theme.colors.accentExtraLight};
  // }
`;

const UserPicture = styled.div`
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  min-height: 2.5rem;
  vertical-align: middle;
  & svg {
    display: block;
    margin: auto;
    height: inherit;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Username = styled.span`
  text-align: center;
  grid-row: 1 / 2;
  grid-column: 2 / -1;
  min-height: 1.25rem;
  font-weight: 600;
`;

const UserDetails = styled.span`
  grid-row: 2 / 3;
  grid-column: 2 / -1;
  min-height: 1.25rem;
`;
const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  height: 1rem;
`;

const Avatar = styled.img`
  max-height: 25px;
  max-width: 25px;
`;
const NewCard = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 1fr 1fr 1fr;
  transition: all 0.25s;
  min-height: 3rem;
  max-height: 3rem;
  overflow: hidden;
  padding: 0.25rem 0;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${Theme.theme3.highlight2};
    box-shadow: 0 0 8px 2px ${Theme.theme3.highlight2};
    max-height: 4.5rem;
  }
`;

const NewAvatar = styled.img`
  max-height: 2.5rem;
  z-index: 2;
  grid-row: 1 / 3;
  grid-column: 1 / 3;
  overflow: hidden;
`;

const NewName = styled.div`
  min-height: 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  padding-left: 1rem;
  margin: auto 0 auto 0;
  grid-row: 1 / 3;
  grid-column: 3 / -1;
  display: flex;
  align-items: center;
  z-index: 10;
`;

const NewPlaceholderAvatar = styled(FaUserSecret)`
  grid-row: 1 / 3;
  grid-column: 1 / 3;
  min-width: 100%;
  min-height: 2.5rem;
  font-size: 1.5rem;
  background-color: inherit;
  z-index: 2;
`;

const InteractiveButtons = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / -1;
  z-index: 0;
  display: flex;
  justify-content: center;
  background-color: inherit;
  & svg {
    margin: 0 1rem;
  }
`;

export default function Hit({ hit }) {
  let avatar;
  if (hit.avatar) {
    console.log(hit.avatar);
    avatar = (
      <Avatar
        src={hit.avatar.url}
        className="hit-avatar"
        align="left"
        alt={`${hit.displayName}'s profile picture`}
      />
    );
  } else {
    avatar = (
      <FaUserSecret
        size={30}
        className="hit-avatar"
        align="left"
        alt={`${hit.displayName}'s default profile picture`}
      />
    );
  }

  const newCard = (
    <NewCard>
      {hit.avatar ? (
        <NewAvatar
          src={hit.avatar.url}
          alt={`${hit.displayName}'s profile picture`}
        />
      ) : (
        <NewPlaceholderAvatar
          className="hit-avatar"
          align="left"
          alt={`${hit.displayName}'s default profile picture`}
        />
      )}
      <NewName className="hit-displayName">
        <Highlight attribute="displayName" hit={hit} />
      </NewName>
      <InteractiveButtons>
        <FaEnvelope size={20} />
        <FaUserPlus size={20} />
      </InteractiveButtons>
    </NewCard>
  );
  return newCard;
  // (
  //   <Style>
  //     <UserPicture>{avatar}</UserPicture>
  //     <Username className="hit-displayName">
  //       <Highlight attribute="displayName" hit={hit} />
  //     </Username>
  //     <UserDetails className="hit-description">
  //       <Highlight attribute="description" hit={hit} />
  //     </UserDetails>
  //     <Controls>
  //       <FaEnvelope size={15} />
  //     </Controls>
  //   </Style>
  // );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};
