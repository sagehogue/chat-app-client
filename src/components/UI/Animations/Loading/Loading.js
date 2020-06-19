import React from "react";
import styled, { keyframes } from "styled-components";


const bouncingLoader = keyframes`
0% {
    width: 0.1rem;
    height: 0.1rem;
    opacity: 1;
    transform: translate3d(0);
}
100% {
        width: 1rem;
        height: 1rem;
        opacity: 0.1;
        transform: translate3d(0, -1rem, 0);
}
`

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.isFullscreen ? "40vh" : "0"}
`;

const Span = styled.span`
  background: #fad000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: ${bouncingLoader} 0.6s infinite alternate;
`;

const Span2 = styled.span`
  background: #fad000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: ${bouncingLoader} 0.6s infinite alternate;
  animation-delay: 0.2s;
`;

const Span3 = styled.span`
  background: #fad000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: ${bouncingLoader} 0.6s infinite alternate;
  animation-delay: 0.4s;
`;

export default function LoadingAnimation({ fullscreen = false }) {
    return (
        <Loader isFullscreen={fullscreen}>
            <Span></Span>
            <Span2></Span2>
            <Span3></Span3>
        </Loader>
    );
}