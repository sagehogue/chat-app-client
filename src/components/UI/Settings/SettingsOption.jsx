import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

export default styled.button`
width: 60%;
  text align: center;
margin: auto;
cursor: pointer;
border: 1px transparent solid;
background-color: ${Theme.backgroundColorDarkGray};
font-size: ${Theme.fontSizeS};
color: ${Theme.textColorLight};
transition: all 0.2s;
&:hover{
    // scale: 1.1;
    color: ${Theme.theme3.highlight2};
    border: 1px ${Theme.theme3.highlight2} solid;
}
&:active{
    scale: 1;
    transform: translateY(2px);
}`;
