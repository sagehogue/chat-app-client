import React from "react";
import styled from "styled-components";

import "./LoadingAnimation.css";
//LoadingAnimation CSS file only for @keyframes part.

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  background: #fad000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: bouncingLoader 0.6s infinite alternate;
`;

const Span2 = styled.span`
  background: #fad000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: bouncingLoader 0.6s infinite alternate;
  animation-delay: 0.2s;
`;

const Span3 = styled.span`
  background: #fad000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: bouncingLoader 0.6s infinite alternate;
  animation-delay: 0.4s;
`;

export default function LoadingAnimation() {
  return (
    <Loader>
      <Span></Span>
      <Span2></Span2>
      <Span3></Span3>
    </Loader>
  );
}
