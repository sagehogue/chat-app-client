import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

export default styled.button`
width: 60%;
  text align: center;
margin: auto;
cursor: pointer;
border: none;
background-color: ${Theme.backgroundColorDarkGray};
font-size: ${Theme.fontSizeS};
color: ${Theme.textColorLight};
transition-all: 0.3s;
&:hover{
    scale: 1.1;
    
    
}
&:active{
    scale: 1;
    
}`;
