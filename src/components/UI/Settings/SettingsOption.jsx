import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

export default styled.button`
width: 45%;
  text align: center;
padding: 15px;
margin: 0 auto;
cursor: pointer;
color: ${Theme.offWhite};
background-color: ${Theme.theme3.opaqueBlack};
border: 1px solid transparent;
transition: all ${Theme.transitionSpeed};
font-size: 1.5rem;
&:hover {
  border: 1px solid ${Theme.theme3.highlight2};
  box-shadow: 0 0 8px 2px ${Theme.theme3.highlight2};
  cursor: pointer;
}`
