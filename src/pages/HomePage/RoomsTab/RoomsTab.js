import React from "react";
import styled from "styled-components";

import { FaPlusCircle, FaSearch, FaTimes } from "react-icons/fa";

import Theme from "../../../util/Theme/Theme";

import RoomCabinet from "./RoomCabinet/RoomCabinet";
import Toolbox from "./Toolbox/Toolbox";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import closeIcon from "../../../icons/closeIcon.png";
import RoomCard from "../../../components/UI/RoomCard/RoomCard";

/* TODOS:
* The hover effects need to be finished - they're missing 1-2 inset box shadows to complete the effect. Since the SVG isn't the same size as their box I need to
make it appear like they're glowing from inside or it'll just be an empty circle.
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
  height: 100vh;
  width: 100%;
  background-color: ${Theme.backgroundColorDark};
  transition: all ${Theme.navTransitionDuration} ease-in;
  transform: translateX(
    ${(props) =>
      props.pageOnDisplay == "rooms" || props.pageOnDisplay == "initial"
        ? `0`
        : `5rem`}
  );
  z-index: ${Theme.zIndex.tabs};
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
  border-radius: ${Theme.borderRadiusL};
`;

const Room = styled.li`
  border-radius: ${Theme.borderRadiusL};
  margin: 0.5rem auto;
  background-image: ${(props) => (props.roomPic ? props.roomPic : "none")};
`;

const FavoriteRooms = styled.ul`
  width: 91%;
  padding: 0.5rem 2px;
  margin: 0 auto;
  min-height: 1rem;
  text-align: center;
  border-radius: ${Theme.borderRadiusL};
  cursor: pointer;
`;

const NoFavorites = styled.div`
  margin-top: 1rem;
  border-radius: ${Theme.borderRadiusL};
  font-size: 1rem;
  color: ${Theme.textColorLight};
`;

//restyle
const GrayBG = styled.div`
  background-color: rgba(211, 211, 211, 0.35);
  border-radius: ${Theme.borderRadiusBtnL};
  padding: 0.25rem;
`;
const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  width: inherit;
  margin: 0 auto;
  color: ${Theme.textColorLight};
`;

const Stylishhr = styled.hr`
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  opacity: 0.75;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SearchAndNewRoom = styled.div`
  display: flex;
`;

const CreateRoomButton = styled(FaPlusCircle)`
  color: white;

  cursor: pointer;
  transition: all 0.1s;
  border-radius: 50%;
  margin: 0 1.25rem 0 auto;
  opacity: 0.9;
  &:hover {
    opacity: 1;
    scale: 1.075;

    box-shadow: 0 0 60px 3px #fff, 0 0 100px 6px #f0f, 0 0 140px 9px #0ff;
  }
  &:active {
    opacity: 0.8;
    transform: translateY(2px);
  }
`;

const CloseButton = styled(FaTimes)`
  transition: all 0.1s;
  margin-bottom: 4rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    opacity: 1;
    scale: 1.075;
    background: radial-gradient(
      circle farthest-side,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.2)
    );
    background-repeat: no-repeat;

    box-shadow: 0 0 8px 5px rgba(255, 255, 255, 0.2),
      0 0 10px 3px rgba(255, 0, 255, 0.15), 0 0 14px 6px rgba(0, 255, 255, 0.15),
      0 0 100px 100px rgba(255, 255, 255, 0.1) inset;

    // box-shadow: 0 0 60px 3px #fff, /* inner white */ 0 0 100px 6px #f0f,
    //   /* middle magenta */ 0 0 140px 9px #0ff;
  }
  &:active {
    opacity: 0.8;
    transform: translateY(2px);
  }
`;

const SearchButton = styled(FaSearch)`
  transition: all 0.1s;
  margin-bottom: 4rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    opacity: 1;
    scale: 1.075;
    background: radial-gradient(
      circle farthest-side,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0.2)
    );
    background-repeat: no-repeat;

    box-shadow: 0 0 8px 5px rgba(255, 255, 255, 0.2),
      0 0 10px 3px rgba(255, 0, 255, 0.15), 0 0 14px 6px rgba(0, 255, 255, 0.15),
      0 0 100px 100px rgba(255, 255, 255, 0.1) inset;

    // box-shadow: 0 0 60px 3px #fff, /* inner white */ 0 0 100px 6px #f0f,
    //   /* middle magenta */ 0 0 140px 9px #0ff;
  }
  &:active {
    opacity: 0.8;
    transform: translateY(2px);
  }
`;

export default function RoomsTab({
  pageOnDisplay,
  favoriteRooms = null,
  rooms = null,
  closeTabHandler,
  createRoomHandler,
  addFavorite,
  removeFavorite,
  joinHandler,
  deleteHandler,
  user,
  openRoomSearchHandler,
}) {
  // Attach event listeners to these that take you to corresponding room
  let roomButtons, favRoomButtons, savedRooms;
  if (rooms) {
    favoriteRooms = rooms.filter((room) => room.isFavorite);
  }
  if (favoriteRooms && favoriteRooms.length > 0) {
    favRoomButtons = favoriteRooms.map((room) => (
      <RoomCard
        roomPic={room.pic}
        roomName={room.roomName}
        joinHandler={joinHandler}
        id={room.id}
        user={user}
      ></RoomCard>
    ));
  }
  if (rooms) {
    rooms.map((room) => console.log(room));
    savedRooms = rooms.filter(
      (room) => room.isFavorite == false || room.isFavorite == undefined
    );
    roomButtons = savedRooms.map((room) => (
      <RoomCard
        roomPic={room.pic}
        roomName={room.roomName}
        joinHandler={joinHandler}
        id={room.id}
        user={user}
      ></RoomCard>
    ));
  }

  return (
    <RoomsTabStyle pageOnDisplay={pageOnDisplay}>
      <Controls>
        <CloseButton size={25} onClick={closeTabHandler} />
        <CreateRoomButton size={25} onClick={createRoomHandler} />
        <SearchButton size={25} onClick={openRoomSearchHandler} />
      </Controls>

      <RoomCabinet
        rooms={rooms}
        user={user}
        joinHandler={joinHandler}
        deleteHandler={deleteHandler}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
      ></RoomCabinet>
      {/* <Toolbox /> */}
    </RoomsTabStyle>
  );
}
