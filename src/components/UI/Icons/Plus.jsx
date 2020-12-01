import React, { useState } from 'react'

import styled from 'styled-components'

import Theme from "../../../util/Theme/Theme";

const Container = styled.div`
  transition: all 0.2s;
  width: ${Theme.ui.iconSize};
  height: ${Theme.ui.iconSize};
  position: relative;
  
  cursor: pointer;
  color: ${(props) =>
    props.hover ? Theme.theme3.hightlight2 : Theme.offBlack};
`;
const Line = styled.div`
  width: 0.375rem;
  height: 1.5rem;
  transition: all 0.2s;
  position: absolute;
  top: 14%;
  left: 40%;
  border-radius: 5px;
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



const Line1 = styled(Line)`
  
  border: ${(props) => (props.hover ? "" : "")};
`;
const Line2 = styled(Line)`
  transform: rotate(90deg);
  border: ${(props) => (props.hover ? "" : "")};
`;

export default function PlusIcon({ click }) {
    const [hover, setHover] = useState(false);
    return (
      <Container
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={click}
        hover={hover}
      >
        <Line1 hover={hover} />
        <Line2 hover={hover} />
      </Container>
    );
  }