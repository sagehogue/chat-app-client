import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import styled from "styled-components";

const TextContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  color: white;
  height: 60%;
  justify-content: space-between;
  @media (min-width: 320px) and (max-width: 1200px) {
    display: none;
  }
`;

const ActiveContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50%;
  & h1 {
    margin-bottom: 0;
  }
`;

const ActiveItem = styled.div`
  display: flex;
  align-items: center;
`;

const ActiveIMG = styled.img`
  padding-left: 10px;
`;

const TextContainer = ({ users }) => (
  <TextContainerStyle>
    <div>
      <h1>
        Realtime Chat Application{" "}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h1>
      <h2>
        Created with React, Express, Node and Socket.IO{" "}
        <span role="img" aria-label="emoji">
          ❤️
        </span>
      </h2>
      <h2>
        Try it out right now!{" "}
        <span role="img" aria-label="emoji">
          ⬅️
        </span>
      </h2>
    </div>
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <ActiveContainer>
          <h2>
            {users.map(({ name }) => (
              <ActiveItem key={name}>
                {name}
                <ActiveIMG alt="Online Icon" src={onlineIcon} />
              </ActiveItem>
            ))}
          </h2>
        </ActiveContainer>
      </div>
    ) : null}
  </TextContainerStyle>
);

export default TextContainer;
