import React from "react";
import styled from "styled-components";

import { FaPlusCircle } from "react-icons/fa";

import Theme from "../../../util/Theme/Theme";
import Toolbox from "./Toolbox/Toolbox";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import closeIcon from "../../../icons/closeIcon.png";

/* TODOS:
* Mobile view looks kind of shit, need to make the search bar look nice and scale up the
add room button.
Write functionality to enable drop down menu of search results for a given room name. 
Maybe look for some kind of package that can handle pagination
*/

const RoomsTabStyle = styled.section`
  grid-row: 1 / -1;
  grid-column: 3 / 4;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: ${Theme.white};
  transition: all ${Theme.navTransitionDuration} ease-in;
  transform: translateX(
    ${(props) =>
      props.pageOnDisplay == "rooms" || props.pageOnDisplay == "initial"
        ? `0`
        : `5rem`}
  );
  z-index: 2;
  @media screen and (min-width: 400px) {
    transform: translateX(
      ${(props) =>
        props.pageOnDisplay == "rooms" || props.pageOnDisplay == "initial"
          ? `0`
          : `10rem`}
    );
  }
  @media screen and (min-width: 800px) {
    transform: translateX(
      ${(props) =>
        props.pageOnDisplay == "rooms" || props.pageOnDisplay == "initial"
          ? `0`
          : `15rem`}
    );
    padding: 1rem;
  }
  @media screen and (min-width: 1200px) {
    transform: translateX(
      ${(props) =>
        props.pageOnDisplay == "rooms" || props.pageOnDisplay == "initial"
          ? `0`
          : `20rem`}
    );
    padding: 2rem;
  }
  @media screen and (min-width: 1600px) {
    transform: translateX(
      ${(props) =>
        props.pageOnDisplay == "rooms" || props.pageOnDisplay == "initial"
          ? `0`
          : `25rem`}
    );
    padding: 2rem;
  }
`;

const CloseButton = styled.button`
  align-self: flex-start;
`;

const RoomsList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 20vw;
`;

const Rooms = styled.div`
  width: 91%;
  padding: 0.5rem 2px;
  margin: 0 auto;
  min-height: 1rem;
  text-align: center;
  border-radius: 15%;
`;

const Room = styled.li`
  border-radius: 15%;
  margin: 0.5rem auto;
  background-image: ${(props) => (props.roomPic ? props.roomPic : "none")};
`;

const FavoriteRooms = styled.ul`
  width: 91%;
  padding: 0.5rem 2px;
  margin: 0 auto;
  min-height: 1rem;
  text-align: center;
  border-radius: 15%;
`;

const NoFavorites = styled.div`
  margin-top: 1rem;
  border-radius: 15%;
  font-size: 0.75rem;
`;

const GrayBG = styled.div`
  background-color: rgba(211, 211, 211, 0.35);
`;
const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  width: inherit;
  margin: 0 auto;
`;

const Stylishhr = styled.hr`
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  opacity: 0.75;
`;

const AddRoomButton = styled(FaPlusCircle)`
  font-size: 1.6rem;
  width: 12.5%;
  text-align: center;
  color: lightseagreen;
  margin: auto auto auto 0;
`;

const SearchAndNewRoom = styled.div`
  display: flex;
`;

export default function RoomsTab({
  pageOnDisplay,
  favoriteRooms = null,
  rooms = null,
  closeTabHandler,
  createRoomHandler,
}) {
  // Attach event listeners to these that take you to corresponding room
  let roomButtons, favRoomButtons;
  if (favoriteRooms) {
    favRoomButtons = favoriteRooms.map((room) => (
      <Room roomPic={room.pic}>{room.name}</Room>
    ));
  }
  if (rooms) {
    roomButtons = favoriteRooms.map((room) => (
      <Room roomPic={room.pic}>{room.name}</Room>
    ));
  }
  return (
    <RoomsTabStyle pageOnDisplay={pageOnDisplay}>
      <CloseButton onClick={closeTabHandler}>
        <img src={closeIcon} alt="close icon" />
      </CloseButton>
      <RoomsList>
        <SearchAndNewRoom>
          <SearchBar small noRightMargin />
          <AddRoomButton onClick={createRoomHandler} />
        </SearchAndNewRoom>
        <FavoriteRooms>
          <Label>Favorites</Label>
          <Stylishhr />
          <GrayBG>
            {favoriteRooms ? (
              favRoomButtons
            ) : (
              <NoFavorites>
                Add some rooms to your favorites to see them displayed here.
              </NoFavorites>
            )}
          </GrayBG>
        </FavoriteRooms>
        <Rooms>
          <Stylishhr />
          <GrayBG>
            {rooms ? (
              roomButtons
            ) : (
              <NoFavorites>
                Save some rooms to find them displayed here.
              </NoFavorites>
            )}
          </GrayBG>
        </Rooms>
      </RoomsList>
      {/* <Toolbox /> */}
    </RoomsTabStyle>
  );
}
