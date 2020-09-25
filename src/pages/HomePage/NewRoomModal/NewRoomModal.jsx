import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../../../components/UI/Modal/Modal";

// [TODOS]

// Create a way to invite users to room as soon as it is created.

const Styles = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

const Heading = styled.h3`
  margin-top: 2rem;
  text-align: center;
`;

const Label = styled.label`
  text-align: center;
  display: block;
  margin-top: 1.25rem;
`;

const CreateRoomForm = styled.form`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 75%;
`;

const FormInput = styled.input`
  display: block;
  margin: ${(props) => (props.centered ? "0 auto 0 auto" : "0")};
  width: 100%;
`;

const SubmitButton = styled.button`
  margin-top: auto;
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
