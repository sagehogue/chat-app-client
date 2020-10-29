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
  max-width: 15rem;
  font-size: 13rem;
  height: 16rem;
  display: flex;
  overflow: hidden;
`;

const Avatar = styled.img``;

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

const FormButton = styled.button`
  text-align: center;
  text-transform: uppercase;
  color: ${Theme.colors.offWhite};
  letter-spacing: 2px;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  padding: 0.7rem 2.5rem;
  background-color: ${Theme.colors.brightAccentRed};
`;

const InputButton = styled(FormButton)`
  position: relative;
  display: block;
  margin: 1rem auto auto auto;
  background-color: ${Theme.colors.accentMedium};
`;

const SubmitButton = styled(FormButton)`
  width: 15rem;
  margin: 5rem auto auto auto;
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
  roomID,
  handleCloseRoomSettings,
}) {
  const [avatar, setAvatar] = useState(avatarData);

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
    const imageUuid = uuid();
    const newAvatarRef = storageRef.child(`images/${imageUuid}`);
    newAvatarRef.put(fileRef.current.files[0]).then(function (snapshot) {
      newAvatarRef.getDownloadURL().then((url) => {
        console.log(roomID);
        console.log(`AVATAR OBJECT: ${{ id: imageUuid, url }}`);
        socket.emit("change-room-avatar", {
          id: roomID,
          avatar: { id: imageUuid, url },
        });
        setAvatar({ id: imageUuid, url });
      });
    });
  };

  return (
    <Modal shouldDisplay={shouldDisplay}>
      {/* <CloseButton onClick={handleCloseRoomSettings}></CloseButton> */}
      <Heading>Room Settings</Heading>
      <Options onSubmit={submitHandler}>
        <Setting>
          <Preview>
            <VerticalCenter>
              {avatar ? <Avatar src={avatar.url} /> : <FaDoorOpen />}
            </VerticalCenter>
          </Preview>
          <Controls>
            <VerticalCenter>
              <Description>
                Upload a new image to use as room avatar
              </Description>
              <InputButton type="button">
                Select
                <AvatarInput type="file" name="file" ref={fileRef} />
              </InputButton>
            </VerticalCenter>
          </Controls>
        </Setting>
        <SubmitButton type="submit">submit</SubmitButton>
      </Options>
    </Modal>
  );
}
