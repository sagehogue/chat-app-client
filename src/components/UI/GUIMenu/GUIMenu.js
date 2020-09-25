import React, { Component } from "react";
//import logo from './logo.svg';
import "./Gooey1.css";
import styled from "styled-components";

//things to do:
//convert to styled components
//MOBILE FRIENDLY/make it dynamic

const GooeyContainer = styled.div``;
const Menu = styled.nav`
  position: absolute;
  left: 50%;
  margin-left: -190px;
  padding-top: 20px;
  padding-left: 190px;
  width: 380px;
  height: 250px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: left;
`;

class Gooey1 extends Component {
  render() {
    return (
      <GooeyContainer>
        <Menu>
          <input
            type="checkbox"
            href="#"
            className="menu-open"
            name="menu-open"
            id="menu-open"
          />
          <label className="menu-open-button" htmlFor="menu-open">
            <span className="hamburger hamburger-1"></span>
            <span className="hamburger hamburger-2"></span>
            <span className="hamburger hamburger-3"></span>
          </label>

          <a href="#" className="menu-item">
            {" "}
            <i className="fa fa-bar-chart"></i>{" "}
          </a>
          <a href="#" className="menu-item">
            {" "}
            <i className="fa fa-plus"></i>{" "}
          </a>
          <a href="#" className="menu-item">
            {" "}
            <i className="fa fa-heart"></i>{" "}
          </a>
          <a href="#" className="menu-item">
            {" "}
            <i className="fa fa-envelope"></i>{" "}
          </a>
          <a href="#" className="menu-item">
            {" "}
            <i className="fa fa-cog"></i>{" "}
          </a>
        </Menu>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="shadowed-goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
              <feColorMatrix
                in="shadow"
                mode="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
                result="shadow"
              />
              <feOffset in="shadow" dx="1" dy="1" result="shadow" />
              <feBlend in2="shadow" in="goo" result="goo" />
              <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
      </GooeyContainer>
    );
  }
}

export default Gooey1;
