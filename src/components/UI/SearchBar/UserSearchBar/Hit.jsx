import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Theme from "../../../../util/Theme/Theme";
import { FaUserSecret, FaEnvelope } from "react-icons/fa";

import { Highlight } from "react-instantsearch-dom";

const Style = styled.div`
  transition: all 0.35s;
  display: grid;
  grid-template-rows: 2fr 2fr 1fr;
  grid-template-columns: repeat(5, 1fr);
  max-height: 3rem;
  overflow: hidden;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
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

export default function Hit({ hit }) {
  console.log(hit);
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
  } else {
    avatar = (
      <FaUserSecret
        size={25}
        className="hit-avatar"
        align="left"
        alt={hit.displayName}
      />
    );
  }
  return (
    <Style>
      <UserPicture>{avatar}</UserPicture>
      <Username className="hit-displayName">
        <Highlight attribute="displayName" hit={hit} />
      </Username>
      <UserDetails className="hit-description">
        <Highlight attribute="description" hit={hit} />
      </UserDetails>
      <Controls>
        <FaEnvelope size={15} />
      </Controls>
    </Style>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};
