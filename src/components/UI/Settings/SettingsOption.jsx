import React from "react";
import styled from "styled-components";

export default styled.button`
width: 60%;
  text align: center;
margin: auto;
cursor: pointer;
border: none;
background-color: #333;
font-size: 1.5rem;
color: #fff;
transition-all: 0.3s;
&:hover{
    scale: 1.1;
    
    
}
&:active{
    scale: 1;
    
}`;
