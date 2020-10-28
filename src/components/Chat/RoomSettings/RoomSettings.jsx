import React, { useState, useEffect, createRef } from "react";
import styled from "styled-components";
import uuid from "react-uuid";

import { FaDoorOpen } from "react-icons/fa";
import CurrentUser, { getStorageRef } from "../../../App";

import Modal from "../../UI/Modal/NewModal";

import Theme from "../../../util/Theme/Theme";

const Heading = styled.h1`
  display: block;
  text-align: center;
  margin: 2rem 0;
  font-family: ${Theme.font.type.heading};
  color: ${Theme.font.color.heading};
  font-size: ${Theme.font.size.headingDesktop};
`;

const Options = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Setting = styled.li`
  display: flex;
  margin: 1rem auto;
  justify-content: space-around;
`;

const Preview = styled.div``;

const Controls = styled.span`
  max-width: 75%;
  justify-content: flex-end;
`;

const Description = styled.span`
  word-wrap: wrap;
  text-align: center;
  max-width: 75%;
  display: inline-block;
`;

const AvatarInput = styled.input`
  border: none;
  background: ${Theme.backgroundColorLigjtGray};
  color: ${Theme.textColorLight};
  display: block;
  cursor: pointer;
  min-width: 3rem;
  max-width: 6rem;
  min-height: 2rem;
  max-height: 4rem;
  margin: 1rem auto;
  vertical-align: middle;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  margin-left: 0.5rem;
  padding: 1px;
  position: absolute;
  align-self: flex-start;
  z-index: 2;
  background-color: transparent;
  opacity: 0.7;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: ${Theme.transitionSpeed};
  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
  &:active {
    opacity: 0.8;
    transform: translateY(1px);
  }
`;

export default function RoomSettings({
  shouldDisplay,
  avatarData = false,
  socket,
  id,
  handleCloseRoomSettings,
}) {
  const [avatar, setAvatar] = useState(avatarData);

  useEffect(() => {
    setAvatar(avatarData);
  }, [avatarData]);

  // Reference to our uploaded file
  const fileRef = createRef();

  const storageRef = getStorageRef();

  const uploadNewRoomAvatar = () => {
    const imageUuid = uuid();
    const newAvatarRef = storageRef.child(`images/${imageUuid}`);
    newAvatarRef.put(fileRef.current.files[0]).then(function (snapshot) {
      newAvatarRef.getDownloadURL().then((url) => {
        socket.emit("change-avatar", { id, image: { id: imageUuid, url } });
        setAvatar({ id: imageUuid, url });
      });
    });
  };

  return (
    <Modal shouldDisplay={shouldDisplay}>
      <CloseButton onClick={handleCloseRoomSettings}></CloseButton>
      <Heading>Room Settings</Heading>
      <Options>
        <Setting>
          <Preview>
            <FaDoorOpen size={100} />
          </Preview>
          <Controls>
            <Description>Upload a new image to use as room avatar</Description>
            <AvatarInput type="file" name="file" ref={fileRef} />
          </Controls>
        </Setting>
      </Options>
    </Modal>
  );
}
