import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";
import { AuthContext, firebaseController } from "../../App";
import * as EmailValidator from "email-validator";

import background from "../../img/background.jpg";
import styled from "styled-components";
import SignInButton from "../../components/UI/Buttons/SubmitButton";
// import SignInButton from "./SignInButton/SignInButton";
import LoginForm from "./LoginForm/LoginForm";
import { Register } from "../../components/UI/Buttons/Register";
import RegisterForm from "./RegisterForm/RegisterForm";
import GlobalStyle from "../../util/GlobalStyles/GlobalStyles";
import Theme from "../../util/Theme/Theme";

import { Redirect } from "react-router";

// TODOS
// 1.) Create a back button for the registration screen in case someone wants to cancel it and sign in.
// 2.) Handle invalid email submissions - create some element that will tell them to correct it, and what the requirements are.

const AuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OuterFormContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background: ${Theme.theme3.color2};
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;
const FormStyleContainer = styled.div`
  height: 65%;
  width: 65%;
  background-color: ${Theme.theme3.color5};
  border-radius: 2%;
  @media screen and (min-width: 800px) {
    max-width: 45vw;
  }
  @media screen and (min-width: 1100px) {
    max-width: 35vw;
  }
  @media screen and (min-width: 1300px) {
    max-width: 25vw;
  }
  @media screen and (min-width: 1600px) {
    width: 50vw;
  }
`;
const InnerFormContainer = styled.div`
  margin: auto;
  justify-content: center;
  position: relative;
  height: 60rem;
  width: 25rem;
  @media (min-width: 240px) and (max-width: 750px) {
    width: 90%;
  }
  @media screen and (min-width: 750px) {
    width: 75%;
  }
  @media screen and (min-width: 1100px) {
    width: 65%;
  }

  @media screen and (min-width: 1600px) {
    width: 25rem;
  }
`;

const Heading = styled.h1`
  color: white;
  font-size: ${Theme.font.size.largeHeading};
  font-family: "Josefin Sans", sans-serif;
  padding-bottom: 10px;
  margin-top: 1rem;
  @media (max-width: 300px) {
    font-size: 2.5rem;
  }
`;
const EmailInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  border-radius: 5px;
  outline: none;
  border: none;
`;

const PasswordInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  margin-top: 20px;
  border-radius: 5px;
  outline: none;
  border: none;
`;

export default function LoginPage({ socket }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  // formerly "Chatter"
  const [heading, setHeading] = useState("Harmony");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  let userAuth = useContext(AuthContext);
  if (userAuth.loggedIn) {
    return <Redirect to="/" />;
  }
  console.log(socket);

  // socket.emit("on-login-page");

  const handleDisplayRegisterForm = () => {
    // changes the variable that controls which form is displayed
    setShowRegisterForm(true);
    setHeading("Registration");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;
    const validEmail = EmailValidator.validate(email);

    // VALIDATION GOES HERE

    // IMPLEMENT ME
    if (validEmail) {
      // Create new account
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const user = firebase.auth().currentUser;
          socket.emit("register-user", {
            uid: user.uid,
            displayName: username,
            email,
          });
          // This is how you update properties on the profile.
          user
            .updateProfile({
              displayName: username,
            })
            .then(function () {
              // Update successful.
              socket.emit();
              // Code to prepare the room join screen goes here.
            })
            .catch(function (error) {
              return alert("Error! Account failed to update. Error: " + error);
            });
          setHeading("Chatter");
        });
      // .catch(function (error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   alert(
      //     `ERROR ${errorCode}\n
      //   ${error.message}`
      //   );
      //   // ...
      // });
    } else {
      alert(
        "ERROR\nPlease enter a valid email\nAddress must be formatted <6+ letters>@<domain>.<tld>"
      );
    }
  };

  return (
    <OuterFormContainer>
      <GlobalStyle />
      <FormStyleContainer>
        <InnerFormContainer>
          <LoginForm
            showRegisterForm={showRegisterForm}
            onSubmit={handleLoginSubmit}
          >
            <Heading>{`${heading}`}</Heading>
            <EmailInput
              required
              placeholder="Email"
              name="email"
              type="text"
              onChange={(event) => setEmail(event.target.value)}
            />

            <PasswordInput
              required
              placeholder="Password"
              name="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />

            <AuthButtons>
              <SignInButton>Sign In</SignInButton>
              <Register onClick={() => handleDisplayRegisterForm()}>
                Register
              </Register>
            </AuthButtons>
          </LoginForm>
          <RegisterForm
            heading={heading}
            showRegisterForm={showRegisterForm}
            handleSubmit={handleRegisterSubmit}
          />
        </InnerFormContainer>
      </FormStyleContainer>
    </OuterFormContainer>
  );
}
