import React, { useState } from "react";
import styled from "styled-components";

import Uuid from "react-uuid";
import Theme from "../../../util/Theme/Theme";
import { Modal } from "../../../components/UI/Modal/NewModal";
import SubmitButton from "../../../components/UI/Buttons/SubmitButton";

// [TODOS]

// Create a way to invite users to room as soon as it is created.

const Styles = styled(Modal)`
  background-color: ${Theme.theme3.color2};
  color: ${Theme.offWhite};
  // & input {
  //   max-width: 5rem;
  // }
`;

const Position = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin: auto;
  height: 100%;
`;

const Heading = styled.h3`
  margin-top: 1rem;
  text-align: center;
  // color: ${Theme.offWhite};
  margin: 2rem auto 5rem auto;
`;

const Label = styled.label`
  text-align: center;
  display: block;
  max-width: 75%;
  margin: 1.25rem auto 0 auto;
`;

const CreateRoomForm = styled.form`
  min-width: 25rem;
  // margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  & >:last-child {
align-self: flex-end;
margin-top: auto;
  }
  
`;

const FormInput = styled.input`
  display: block;
  margin: ${(props) => (props.centered ? "0 auto 0 auto" : "0")};
  width: 100%;
  border: none;
  height: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: ${Theme.textColorLight};
  border: 1px solid ${Theme.backgroundColorLight};
`;



const ConfirmPasswordInput = styled(FormInput)`
  
  &::after {
    content: ${(props) =>
      props.passwordMatch ? "" : "Passwords do not match"};
  }
`;

const PlaceHolder = styled.div`
height: 10rem;

`

const ErrorBox = styled.div`
  color: red;
  font-size: 1.5rem;
`;

export default function NewRoomModal({
  visible,
  submitHandler,
  closeHandler,
  user,
}) {
  const [name, setName] = useState("");
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const inputName = target.name;

    switch (inputName) {
      case "roomName":
        setName(value);
        // check if roomName is taken
        return;
      case "isPasswordProtected":
        setPasswordProtected(value);
        return;
      case "password":
        setPassword(value);
        if (confirmPassword) {
          setPasswordsMatch(value == confirmPassword);
        }
        return;
      case "confirmPassword":
        setConfirmPassword(value);
        console.log(password, value, password == value);
        setPasswordsMatch(password == value);
        return;
    }
  };

  const clearInputs = () => {
    setName("");
    setPasswordProtected(false);
    setPassword("");
    setConfirmPassword("");
    setPasswordsMatch(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      roomName: name,
      passwordProtected: passwordProtected,
      password: password,
      creator: user.displayName,
      creatorUID: user.uid,
      roomID: Uuid(),
    };
    submitHandler(data);
  };
  if (
    visible == false &&
    (name || password || confirmPassword || passwordProtected)
  ) {
    clearInputs();
  }
  return (
    <Styles shouldDisplay={visible}>
      <Position>
        <Heading>Create New Room</Heading>
        <CreateRoomForm>
          <Label>
            Name:
            <FormInput
              type="text"
              value={name}
              name={"roomName"}
              onChange={handleChange}
              centered
            />
          </Label>
          <Label>
            Password Protected?
            <FormInput
              name="isPasswordProtected"
              type="checkbox"
              checked={passwordProtected}
              onChange={handleChange}
            />
          </Label>
          {passwordProtected ? (
            <Label>
              Password:
              <FormInput
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                centered
              />
            </Label>
          ) : null}
          {passwordProtected ? (
            <Label>
              Confirm Password:
              <ConfirmPasswordInput
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                centered
                passwordMatch={passwordsMatch}
              />
            </Label>
          ) : <PlaceHolder />}
          <SubmitButton type="submit" onClick={handleSubmit}>
            Submit
          </SubmitButton  >
        </CreateRoomForm>
      </Position>
    </Styles>
  );
}
