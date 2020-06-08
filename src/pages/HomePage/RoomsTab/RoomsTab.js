import React from 'react'
import styled from 'styled-components';

import { FaSearch } from 'react-icons/fa'
import Theme from '../../../util/Theme/Theme'
import Toolbox from './Toolbox/Toolbox'

const RoomsTabStyle = styled.section`
  grid-row: 1 / -1;
  grid-column: 3 / 4;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  transition: all ${Theme.navTransitionDuration} ease-in-out;
  transform: translateX(
    ${props => (props.pageOnDisplay == "rooms" ? `0` : `5rem`)}
  );
  z-index: 2;
`;

const RoomsList = styled.div`
display: flex;
flex-direction: column;
height: 100vw;
background-color: red;
`

const Rooms = styled.div`

`

const FavoriteRooms = styled.div`

`

export default function RoomsTab({ pageOnDisplay }) {
  return (
    <RoomsTabStyle pageOnDisplay={pageOnDisplay}>
      <RoomsList>
        <FaSearch />
        <FavoriteRooms />
        <Rooms />
      </RoomsList>
      <Toolbox />
    </RoomsTabStyle>
  )
}
