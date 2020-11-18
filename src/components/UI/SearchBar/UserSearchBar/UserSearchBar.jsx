import React from "react";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";

import Theme from "../../../../util/Theme/Theme";
import Hit from "./Hit";

const SearchBarWrapper = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  grid-column: ${Theme.gridColChat};
  grid-row: ${Theme.gridRowChat};
  grid-row: 2 / 12;
  // for some reason the theme grid row wasnt full screen?
  z-index: ${Theme.zIndex.modal};
  background-color: ${Theme.colors.primary};
  font-family: sans-serif;
  padding: 0 1rem;
  height: 100%;
  width: 100%;
  & .ais-SearchBox {
    margin: 1em 0;
  }
  & .ais-Hits {
    min-height: 31.5rem;
  }
  & .ais-InstantSearch {
  }
  & .ais-Pagination-list {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
  }
  .ais-Hits-item {
    &:nth-of-type(even) {
      & div {
        background-color: #d7faf5;
      }
      background-color: #d7faf5;
      // background-color: ${Theme.colors.accentLight}; OLD COLORS
    }
    &:nth-of-type(odd) {
      & div {
        background-color: #a3d4cc;
      }
      // background-color: ${Theme.colors.accentExtraLight}; OLD COLORS
    }
    // &:nth-of-type(even) {
    //   background-color: ${Theme.colors.accentLight};
    // }
    // &:nth-of-type(odd) {
    //   background-color: ${Theme.colors.accentExtraLight};
    // }
  }
`;

const Styles = styled.div`
  padding: 1rem;
  margin: 0 auto auto auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SearchAndResults = styled.div`
  // margin: 1rem auto 0 auto;
  min-height: 25rem;
  display: flex;
  flex-direction: column;
`;

const SearchHeading = styled.h1`
  text-align: center;
  // margin-bottom: 1.5rem;
  @media screen and (min-width: 700px) {
    margin-bottom: 3rem;
  }
`;

// const AlignBottom = styled.div`
//   margin-top: auto;

// `;

const client = algoliasearch("333WBDSI2L", "402eef045334263775aa43830a7952d5");

export default function UserSearchBar({ visible, closeHandler }) {
  const searchChanged = (query) => {
    if (query.length) {
      this.showResults = true;
    } else {
      this.showResults = false;
    }
  };
  return (
    <SearchBarWrapper visible={visible}>
      <Styles>
        <SearchHeading>Users</SearchHeading>
        <InstantSearch
          indexName="user_search"
          searchClient={client}
          translate={{ placeholder: "Search for users..." }}
          onChange={searchChanged}
        >
          <Configure hitsPerPage={10} />
          {/* </div> */}
          <SearchAndResults>
            <SearchBox autofocus />
            <Hits hitComponent={Hit} />
          </SearchAndResults>
          <Pagination />
        </InstantSearch>
      </Styles>
    </SearchBarWrapper>
  );
}
