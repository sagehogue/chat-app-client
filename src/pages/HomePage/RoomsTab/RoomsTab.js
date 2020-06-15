import React from 'react'
import styled from 'styled-components';

import Theme from '../../../util/Theme/Theme'
import Toolbox from './Toolbox/Toolbox'
import SearchBar from '../../../components/UI/SearchBar/SearchBar'

/* TODOS:
Write functionality to enable drop down menu of search results for a given room name. 
Maybe look for some kind of package that can handle pagination
*/

const RoomsTabStyle = styled.section`
  grid-row: 1 / -1;
  grid-column: 3 / 4;
  overflow: hidden;
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  max-width: 20vw;
  background: rgba(255, 255, 255, 0.3);
  transition: all ${Theme.navTransitionDuration} ease-in;
  transform: translateX(
    ${props => (props.pageOnDisplay == "rooms" ? `0` : `5rem`)}
  );
  z-index: 2;
`;



const RoomsList = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
background-color: ${Theme.white};
max-width: 20vw;
`

const Rooms = styled.div`
width: 91%;
padding: .5rem 2px;
margin: 0 auto;
min-height: 1rem;
text-align: center;
border-radius: 15%;
`


const Room = styled.li`
border-radius: 15%;
margin: .5rem auto;
background-image: ${props => props.roomPic ? props.roomPic : 'none'};
`

const FavoriteRooms = styled.ul`
width: 91%;
padding: .5rem 2px;
margin: 0 auto;
min-height: 1rem;
text-align: center;
border-radius: 15%;
`

const NoFavorites = styled.div`
margin-top: 1rem;
border-radius: 15%;
font-size: .75rem;
`

const GrayBG = styled.div`
background-color: rgba(211,211,211, .35);
`
const Label = styled.label`
display: block;
font-size: .95rem;
width: inherit;
margin: 0 auto;
`

const Stylishhr = styled.hr`
margin-top: .25rem;
margin-bottom: .5rem;
opacity: .75;
`
export default function RoomsTab({ pageOnDisplay, favoriteRooms = null, rooms = null, }) {
  // Attach event listeners to these that take you to corresponding room
  let roomButtons, favRoomButtons
  if (favoriteRooms) {
    favRoomButtons = favoriteRooms.map(room => <Room roomPic={room.pic}>{room.name}</Room>)
  }
  if (rooms) {
    roomButtons = favoriteRooms.map(room => <Room roomPic={room.pic}>{room.name}</Room>)
  }
  return (
    <RoomsTabStyle pageOnDisplay={pageOnDisplay}>
      <RoomsList>
        <SearchBar />
        <FavoriteRooms>
          <Label>Favorites</Label>
          <Stylishhr />
          <GrayBG>
            {favoriteRooms ? favRoomButtons : <NoFavorites>Add some rooms to your favorites to see them displayed here.</NoFavorites>}
          </GrayBG>
        </FavoriteRooms>
        <Rooms>
          <Stylishhr />
          <GrayBG>
            {rooms ? roomButtons : <NoFavorites>Save some rooms to find them displayed here.</NoFavorites>}
          </GrayBG>
        </Rooms>
      </RoomsList>
      <Toolbox />
    </RoomsTabStyle>
  )
}

