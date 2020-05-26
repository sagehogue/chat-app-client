import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import globalStyles from "../GlobalStyles/GlobalStyles";
// Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import styled from "styled-components";
import Login from "../Login/Login";
import Register from "../Register/Register";
import RegisterForm from "../RegisterForm/RegisterForm";
import GlobalStyle from "../GlobalStyles/GlobalStyles";
import background from "../Images/background.jpg";
const AuthButtons = styled.div`
  // transform: translateY(20vh);
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

const LoginForm = styled.form`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;

  transition: all 0.5s;
  opacity: ${props => (props.showRegisterForm ? 0 : 1)};
  z-index: ${props => (props.showRegisterForm ? 0 : 10)};
  pointer-events: ${props => (props.showRegisterForm ? "none" : "auto")};
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
const SignInButton = styled.input`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background-image: linear-gradient(#0090c1, #4099b7);
  padding: 1.25rem;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  margin-top: 1.5rem;
  transition: all 0.15s;

  &:hover {
    transform: scale(1.1) translateY(-0.5rem);
    box-shadow: 0rem 0.15rem #333;
  }
  & :focus {
    outline: none;
    border: none;
  }
  & :active {
    outline: none;
    border: none;
  }
`;

const LogOutButton = styled.input`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: rgba(41, 121, 255, 0.75);
  padding: 1.25rem;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  margin-top: 1.5rem;
  transition: all 0.15s;

  &:hover {
    transform: scale(1.1) translateY(-0.5rem);
    box-shadow: 0rem 0.15rem #333;
    background: rgba(41, 121, 255, 1);
  }
  & :focus {
    outline: none;
    border: none;
  }
  & :active {
    outline: none;
    border: none;
  }
`;

export default function LoginPage() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [heading, setHeading] = useState("Chatter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    // Firebase account settings info
    const firebaseConfig = {
      apiKey: "AIzaSyCGGPrP9z87mezp2ctPzDMHSVdO-Sl2c3c",
      authDomain: "chat-app-c2d82.firebaseapp.com",
      databaseURL: "https://chat-app-c2d82.firebaseio.com",
      projectId: "chat-app-c2d82",
      storageBucket: "chat-app-c2d82.appspot.com",
      messagingSenderId: "773697802163",
      appId: "1:773697802163:web:e7627c57705dd86ebd45c6",
      measurementId: "G-VHVQ28NBE7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Event listener for auth status.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        setAuthenticated(true);
        // example data
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        setAuthenticated(false);
        // ...
      }
    });
    return () => {
      // cleanup
    };
  }, []);

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
    console.log(`
    Login Submit Successful!\n
    email: ${email}
    \n password: ${password}
    `);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  const handleLogOut = e => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened
      });
  };

  const handleRegisterSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;
    console.log(
      `Form submit successful!\n username: ${username}\npassword: ${password}\nemail: ${email}`
    );
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
          .then(function() {
            // Update successful.
            // Code to prepare the room join screen goes here.
          })
          .catch(function(error) {
            return console.log(
              "Error! Account failed to update. Error: " + error
            );
          });
        setHeading("Chatter");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(
          `ERROR ${errorCode}\n
        ${error.message}`
        );
        // ...
      });
    // Create new account
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
              <LogOutButton onClick={() => handleLogOut()} value="Logout" />
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
