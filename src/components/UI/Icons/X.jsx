import React, { useState } from "react";
import styled from "styled-components";

import Theme from "../../../util/Theme/Theme";

const Container = styled.div`
  transition: all 0.2s;
  min-width: 2rem;
  min-height: 2rem;
  position: relative;
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

// &:hover {
//     opacity: 1;
//     scale: 1.075;
//     background: radial-gradient(
//       circle farthest-side,
//       rgba(255, 255, 255, 1),
//       rgba(255, 255, 255, 0.2)
//     );
//     background-repeat: no-repeat;

//     box-shadow: 0 0 8px 5px rgba(255, 255, 255, 0.2),
//       0 0 10px 3px rgba(255, 0, 255, 0.15), 0 0 14px 6px rgba(0, 255, 255, 0.15),
//       0 0 100px 100px rgba(255, 255, 255, 0.1) inset;

//     // box-shadow: 0 0 60px 3px #fff, /* inner white */ 0 0 100px 6px #f0f,
//     //   /* middle magenta */ 0 0 140px 9px #0ff;
//   }
//   &:active {
//     opacity: 0.8;
//     transform: translateY(2px);
//   }

const Line1 = styled(Line)`
  transform: rotate(45deg);
  border: ${(props) => (props.hover ? "" : "")};
`;
const Line2 = styled(Line)`
  transform: rotate(-45deg);
  border: ${(props) => (props.hover ? "" : "")};
`;

export default function X() {
  const [hover, setHover] = useState(false);
  return (
    <Container
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hover={hover}
    >
      <Line1 hover={hover} />
      <Line2 hover={hover} />
    </Container>
  );
}
