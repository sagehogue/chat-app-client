import styled, { keyframes, css } from 'styled-components';

const fadeOutKey = keyframes`
0% {
  opacity: 1;
}
50% {
    opacity: 1;
  }
100% {
  opacity: 0;
}`

const fadeInKey = keyframes`
0% {
  opacity: 0;
}
50% {
    opacity: 0;
  }
100% {
  opacity: 1;
}`

const fadeIn = props =>
    css`
    ${fadeInKey} 1s;
  `

const fadeOut = props =>
    css`
    ${fadeOutKey} 1s;
  `

const LoginForm = styled.form`
animation-fill-mode: forwards;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  animation: ${props => (props.animateLoginForm ? `${fadeIn}` : 'none')};
  animation: ${props => (props.showRegisterForm ? `${fadeOut}` : 'none')};
  opacity: ${props => (props.showRegisterForm ? 0 : 1)};
  z-index: ${props => (props.showRegisterForm ? 0 : 10)};
  pointer-events: ${props => (props.showRegisterForm ? "none" : "auto")};
`;

export default LoginForm