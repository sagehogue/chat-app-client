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
  grid-column: ${Theme.layout.gridColChat};
  grid-row: ${Theme.layout.gridRowChat};
  grid-row: 2 / 12;
  // for some reason the theme grid row wasnt full screen?
  z-index: ${Theme.zIndex.modal};
  background-color: ${Theme.theme3.color2};
  font-family: sans-serif;
  padding: 0 1rem;
  height: ${Theme.ui.modalHeight};
  width: ${Theme.ui.modalWidth};
  margin: auto;
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
        // background-color: ${Theme.theme3.color3};
        background-color: ${Theme.theme3.color2AccentB};
      }
      // background-color: ${Theme.theme3.color3};
    }
    &:nth-of-type(odd) {
      & div {
        background-color: ${Theme.theme3.color2AccentA};
        // background-color: ${Theme.theme3.color4};
      }
    }
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
  color: ${Theme.colors.offWhite};
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
