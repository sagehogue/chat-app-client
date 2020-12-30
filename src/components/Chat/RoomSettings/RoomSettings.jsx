import React, { useState, useEffect, createRef } from "react";
import styled from "styled-components";
import uuid from "react-uuid";

import { FaDoorOpen } from "react-icons/fa";
import CurrentUser, { getStorageRef } from "../../../App";
import { Modal } from "../../UI/Modal/NewModal";
import Submit from "../../UI/Buttons/SubmitButton";
import { RoomSettingsSelect } from "../../UI/Buttons/Select";

import Theme from "../../../util/Theme/Theme";

const SettingsModal = styled(Modal)`
  flex-direction: column;
  position: absolute;
  height: ${Theme.ui.modalHeight};
  width: ${Theme.ui.modalWidth};
  background-color: ${Theme.theme3.color2};
`;

const Heading = styled.h1`
  display: block;
  text-align: center;
  margin: 2rem 0;
  font-family: ${Theme.font.type.heading};
  // color: ${Theme.font.color.heading};
  color: ${Theme.offWhite};
  font-size: ${Theme.font.size.headingDesktop};
`;

const Options = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem 10rem;
  @media (max-width: 1400px) {
    padding: 1rem 8rem;
  }
  @media (max-width: 1200px) {
    padding: 1rem 6rem;
  }
  @media (max-width: 1000px) {
    padding: 1rem 4rem;
  }
  @media (max-width: 800px) {
    padding: 1rem 0.5rem;
  }
`;

const Setting = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem auto;
  justify-content: space-evenly;
  align-items: center;
`;

const Controls = styled.span`
  max-width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.35rem;
  height: 16rem;

  // justify-content: flex-end;
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

const Preview = styled.div`
  width: 15rem;
  height: 15rem;
  display: flex;
  overflow: hidden;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  margin: auto;
`;

const VerticalCenter = styled.div`
  margin: auto;
`;

const Description = styled.span`
  word-wrap: wrap;
  text-align: center;
  max-width: 75%;
  display: inline-block;
  display: block;
  margin: auto;
`;

const AvatarInput = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

export default function RoomSettings({
  shouldDisplay,
  avatarData = false,
  changeAvatarHandler,
  socket,
  id,
  room,
  handleCloseRoomSettings,
}) {
  const roomID = room.id;
  const [avatar, setAvatar] = useState(avatarData);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setAvatar(avatarData);
  }, [avatarData]);

  // Reference to our uploaded file
  const fileRef = createRef();

  const storageRef = getStorageRef();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("SUBMITTED");
    if (fileRef.current) {
      uploadNewRoomAvatar();
    }
  };

  const uploadNewRoomAvatar = () => {
    let oldAvatarRef;
    // check for existing avatar
    if (avatar) {
      oldAvatarRef = storageRef.child(`images/${avatar.id}`);
      oldAvatarRef
        .delete()
        .then(() => {
          // file deleted successfully
          console.log(`SUCCESS! DELETED IMG: ${avatar.id}`);
        })
        .catch((err) => {
          // error occurred
          console.log(`ERROR: ${err}`);
        });
    }
    // if old avatar: delete old avatar

    // create new ID
    const imageUuid = uuid();
    // create ref to future storage location of image
    const newAvatarRef = storageRef.child(`images/${imageUuid}`);
    // save image to storage location
    newAvatarRef.put(fileRef.current.files[0]).then(function (snapshot) {
      newAvatarRef.getDownloadURL().then((url) => {
        console.log(roomID);
        const avatarObject = { id: imageUuid, url };
        console.log(`AVATAR URL: ${avatarObject.url}`);
        socket.emit("change-room-avatar", {
          id: roomID,
          avatar: avatarObject,
        });
        setAvatar(avatarObject);
      });
    });
  };

  const previewAvatar = (e) => {
    console.log(e.target.files[0]);
    const avatar = e.target.files[0];
    const imgReader = new FileReader();
    imgReader.onload = (e) => {
      setPreview(e.target.result);
    };
    imgReader.readAsDataURL(avatar);
  };

  return (
    <SettingsModal shouldDisplay={shouldDisplay}>
      {/* <CloseButton onClick={handleCloseRoomSettings}></CloseButton> */}
      <Heading>Room Settings</Heading>
      <Options onSubmit={submitHandler}>
        <Setting>
          <Preview>
            {avatar ? (
              <Avatar src={avatar.url} />
            ) : preview ? (
              <Avatar src={preview} />
            ) : (
              <VerticalCenter>
                <FaDoorOpen size={150} color={Theme.theme3.color2AccentB} />
              </VerticalCenter>
            )}
          </Preview>
          <Controls>
            <VerticalCenter>
              <Description>
                Upload a new image to use as room avatar
              </Description>
              <RoomSettingsSelect type="button">
                Select
                <AvatarInput
                  type="file"
                  name="file"
                  ref={fileRef}
                  onChange={previewAvatar}
                />
              </RoomSettingsSelect>
            </VerticalCenter>
          </Controls>
        </Setting>
        <Submit type="submit">submit</Submit>
      </Options>
    </SettingsModal>
  );
}
