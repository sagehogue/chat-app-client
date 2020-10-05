import React, { useState } from "react";
import styled from "styled-components";

import Theme from "../../../util/Theme/Theme";
import Modal from "../../../components/UI/Modal/Modal";

// [TODOS]

// Create a way to invite users to room as soon as it is created.

const Styles = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: ${Theme.textColorLight};
`;

const Heading = styled.h3`
  margin-top: 2rem;
  text-align: center;
  background-color: ${Theme.textColorLight};
`;

const Label = styled.label`
  text-align: center;
  display: block;
  margin-top: 1.25rem;
  background-color: ${Theme.textColorLight};
`;

const CreateRoomForm = styled.form`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 75%;
  background-color: ${Theme.textColorLight};
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

const SubmitButton = styled.button`
  width: 25%;
  border: none;
  border-radius: ${Theme.borderRadiusBtn};
  margin: 0 auto;
  margin-top: 30%;
  cursor: pointer;
  padding: 1rem;
  background-color: ${Theme.colorHighlight};
  font-size: ${Theme.fontSizeM};
  color: ${Theme.textColorLight};
`;

const ConfirmPasswordInput = styled(FormInput)`
  &::after {
    content: ${(props) =>
      props.passwordMatch ? "" : "Passwords do not match"};
  }
`;

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
    <Styles visible={visible}>
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
        ) : null}
        <SubmitButton type="submit" onClick={handleSubmit}>
          Submit
        </SubmitButton>
      </CreateRoomForm>
    </Styles>
  );
}
