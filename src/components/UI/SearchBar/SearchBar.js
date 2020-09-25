import React from "react";
import styled from "styled-components";
import Theme from "../../../util/Theme/Theme";

import { FaSearch } from "react-icons/fa";

const SearchBarContainer = styled.div`
  display: inline-block;
  position: relative;
  width: ${(props) => (props.small ? "75" : "91")}%;
  border-radius: 15px;
  overflow: hidden;
  margin: 0.75rem ${(props) => (props.noRightMargin ? "0" : "auto")} 0.75rem
    auto;
  height: 2rem;
  background-color: ${Theme.offWhite};
  & svg {
    position: absolute;
    top: 35%;
    left: 5%;
    color: black;
    font-size: 0.6rem;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  border: none;
  height: inherit;
  outline: none;
  padding: 5% 5% 5% 2rem;
`;

export default function SearchBar({ small, noRightMargin }) {
  return (
    <SearchBarContainer
      small={small ? true : false}
      noRightMargin={noRightMargin}
    >
      <FaSearch />
      <SearchInput placeholder={" ...."} />
    </SearchBarContainer>
  );
}
