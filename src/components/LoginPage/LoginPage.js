import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import globalStyles from "../GlobalStyles/GlobalStyles";
// Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../firebaseConfig';
import { AuthContext, firebaseController } from '../../App'
import * as EmailValidator from 'email-validator';

<<<<<<< HEAD
import { SubmitButton } from "../UI/Button/Button";
import styled from "styled-components";
=======
import background from "../Images/background.jpg";
import styled from 'styled-components'
import { SubmitButton } from '../UI/Button/Button'
>>>>>>> 87298f7176a4b352441bf9995078e2486b6f7abc
import Login from "../Login/Login";
import LoginForm from '../LoginForm/LoginForm'
import Register from "../Register/Register";
import RegisterForm from "../RegisterForm/RegisterForm";
import GlobalStyle from "../GlobalStyles/GlobalStyles";
import { fadeIn } from '../UI/Animations/Animations'

<<<<<<< HEAD
import { Redirect } from "react-router";
=======
import { Redirect } from 'react-router'

// TODOS
// 1.) Create a back button for the registration screen in case someone wants to cancel it and sign in. 
// 2.) Handle invalid email submissions - create some element that will tell them to correct it, and what the requirements are. 

>>>>>>> 87298f7176a4b352441bf9995078e2486b6f7abc

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
<<<<<<< HEAD

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
    let firebaseDoesNotExist;
    // Check if firebase instance exists
    firebaseDoesNotExist = !firebase.apps.length;
    if (firebaseDoesNotExist) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
    // Event listener for auth status.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        setAuthenticated(true);
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
=======
  let userAuth = useContext(AuthContext)
  if (userAuth.loggedIn) {
    return <Redirect to="/" />;
  }
>>>>>>> 87298f7176a4b352441bf9995078e2486b6f7abc

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
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

<<<<<<< HEAD
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

=======
>>>>>>> 87298f7176a4b352441bf9995078e2486b6f7abc
  const handleRegisterSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;
<<<<<<< HEAD
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
  if (authenticated) {
    return <Redirect to="/" />;
  }
=======
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

>>>>>>> 87298f7176a4b352441bf9995078e2486b6f7abc
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
