import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Cabinet from "../../../../components/UI/Cabinet/Cabinet";
import Drawer from "../../../../components/UI/Cabinet/Drawer";
import RoomCard from "../../../../components/UI/RoomCard/RoomCard";

const FavoritesDrawer = styled(Drawer)``;

const FriendsDrawer = styled(Drawer)``;

export default function RoomCabinet({
  rooms = null,
  removeFavorite,
  addFavorite,
  clientID,
  joinHandler,
  deleteHandler,
}) {
  const [favoriteRoomIcons, setFavoriteRoomIcons] = useState([]);
  const [savedRoomIcons, setSavedRoomIcons] = useState([]);

  useEffect(() => {
    console.log(clientID);
    if (rooms) {
      // check for favorite rooms
      const favs = rooms.filter((room) => room.isFavorite);
      setFavoriteRoomIcons(
        rooms
          .filter((room) => room.isFavorite == true)
          .map((favorite) => (
            <RoomCard
              roomName={favorite.roomName}
              id={favorite.id}
              userID={clientID}
              joinHandler={joinHandler}
              deleteHandler={deleteHandler}
              removeFavorite={removeFavorite}
              isFavorite
            ></RoomCard>
          ))
      );
      setSavedRoomIcons(
        rooms
          .filter((room) => room.isFavorite == false)
          .map((room) => (
            <RoomCard
              roomName={room.roomName}
              id={room.id}
              userID={clientID}
              joinHandler={joinHandler}
              deleteHandler={deleteHandler}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            ></RoomCard>
          ))
      );
    }
  }, [rooms]);

  return (
    <Cabinet>
      <FavoritesDrawer name="Favorites">{favoriteRoomIcons}</FavoritesDrawer>
      <FriendsDrawer name="Rooms">{savedRoomIcons}</FriendsDrawer>
    </Cabinet>
  );
}
