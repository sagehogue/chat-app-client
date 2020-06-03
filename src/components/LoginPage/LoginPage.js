import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GlobalStyle from "../UI/GlobalStyles/GlobalStyles";
// Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../firebaseConfig';
import { AuthContext, firebaseController } from '../../App'
import * as EmailValidator from 'email-validator';

import background from "../Images/background.jpg";
import styled from 'styled-components'
import { SubmitButton } from '../UI/Button/Button'
import Login from "../Login/Login";
import LoginForm from '../LoginForm/LoginForm'
import Register from "../Register/Register";
import RegisterForm from "../RegisterForm/RegisterForm";

import { fadeIn } from '../UI/Animations/Animations'

import { Redirect } from 'react-router'

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
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background: url(${background});
  background-size: cover;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;
const FormStyleContainer = styled.div`
  height: 55%;
  width: 22.5%;
  background-color: rgba(51, 51, 51, 0.75);
  border-radius: 2%;
`;
const InnerFormContainer = styled.div`
  margin: auto;
  justify-content: center;
  position: relative;
  height: 600px;
  width: 250px;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 90%;
  }
`;

const Heading = styled.h1`
  color: white;
  font-size: 3.1em;
  font-family: "Josefin Sans", sans-serif;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
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
const SignInButton = styled(SubmitButton)`
  background-image: linear-gradient(#0090c1, #4099b7);
  width: 50%;
  margin-top: 2rem;
  border: none;
`;

export default function LoginPage() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [heading, setHeading] = useState("Chatter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  let userAuth = useContext(AuthContext)
  if (userAuth.loggedIn) {
    return <Redirect to="/" />;
  }

  const handleDisplayRegisterForm = () => {
    // changes the variable that controls which form is displayed
    setShowRegisterForm(true);
    setHeading("Registration");
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  const handleRegisterSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;
    const validEmail = EmailValidator.validate(email)
    if (validEmail) {
      // Create new account
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          const user = firebase.auth().currentUser;

          // This is how you update properties on the profile.
          user
            .updateProfile({
              displayName: username
            })
            .then(function () {
              // Update successful.
              // Code to prepare the room join screen goes here.
            })
            .catch(function (error) {
              return alert(
                "Error! Account failed to update. Error: " + error
              );
            });
          setHeading("Chatter");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(
            `ERROR ${errorCode}\n
          ${error.message}`
          );
          // ...
        });
    } else {
      alert('ERROR\nPlease enter a valid email\nAddress must be formatted <6+ letters>@<domain>.<tld>')
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
            <div>
              <EmailInput
                required
                placeholder="Email"
                name="email"
                type="text"
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div>
              <PasswordInput
                required
                placeholder="Password"
                name="password"
                type="password"
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <AuthButtons>
              {/* <Link
              onClick={e => (!name || !room ? e.preventDefault() : null)}
              to={`/chat?name=${name}&room=${room}`}
            >
            </Link>  This is from the room link component*/}
              <SignInButton type="submit" value="Sign In" />

              <Register clickHandler={() => handleDisplayRegisterForm()} />
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