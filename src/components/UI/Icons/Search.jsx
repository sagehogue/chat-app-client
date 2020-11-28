import React, { useState } from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

const Container = styled.div`
  transition: all 0.2s;
  width: ${Theme.ui.iconSize};
  height: ${Theme.ui.iconSize};
  position: relative;
  color: ${(props) =>
    props.hover ? Theme.theme3.hightlight2 : Theme.offBlack};
`;

const GlowBase = styled.div`
  background: ${(props) =>
    props.hover
      ? `radial-gradient(
          circle farthest-side,
          ${Theme.theme3.highlight2} 100%,
          ${Theme.offWhite},
          rgba(250, 250, 250, 0.2)
        )`
      : "none"};
  background-color: ${(props) =>
    props.hover ? Theme.theme3.hightlight2 : Theme.offBlack};
  box-shadow: ${(props) =>
    props.hover
      ? `0 0 8px 5px rgba(255, 255, 255, 0.2),
     0 0 10px 3px rgba(255, 0, 255, 0.15), 0 0 14px 6px rgba(0, 255, 255, 0.15),
    0 0 100px 100px rgba(255, 255, 255, 0.1) inset;`
      : `none`};
`;

const Circle = styled(GlowBase)`
  transition: all 0.2s;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.hover ? Theme.theme3.highlight2 : Theme.offBlack};
`;

const SmallCircle = styled.div`
  transition: all 0.2s;
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  top: 12.5%;
  left: 12.5%;
  background-color: ${(props) =>
    props.hover ? Theme.offWhite : Theme.theme3.color5};
`;

const Handle = styled(GlowBase)`
  transition: all 0.2s;
  width: 0.75rem;
  height: 0.25rem;
  position: absolute;
  transform: rotate(30deg);
  top: 55%;
  left: 60%;
  border-radius: 20%;
  background-color: ${(props) =>
    props.hover ? Theme.theme3.highlight2 : Theme.offBlack};
`;

export default function Search({ click }) {
  const [hover, setHover] = useState(false);
  return (
    <Container
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={click}
      hover={hover}
    >
      <Circle hover={hover} />
      <SmallCircle hover={hover} />
      <Handle hover={hover} />
    </Container>
  );
}
