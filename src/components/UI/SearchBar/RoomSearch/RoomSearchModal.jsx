import React from "react";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  Stats,
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
  z-index: ${Theme.zIndex.modal};
  background-color: ${Theme.colors.primary};
  font-family: sans-serif;
  padding: 0 1rem;

  & .ais-SearchBox {
    margin: 1em 0;
  }
  .ais-Hits-item {
    &:nth-of-type(even) {
      background-color: ${Theme.colors.accentLight};
    }
    &:nth-of-type(odd) {
      background-color: ${Theme.colors.accentExtraLight};
    }
  }
`;

const Styles = styled.div`
  padding: 1rem;
  margin: 0 auto auto auto;
`;

const SearchAndResults = styled.div`
  margin: 1rem auto 0 auto;
`;

const SearchHeading = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  @media screen and (min-width: 700px) {
    margin-bottom: 3rem;
  }
`;

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
      <Styles className="ais-InstantSearch">
        <SearchHeading>Find a room</SearchHeading>
        <InstantSearch
          indexName="room_search"
          searchClient={client}
          translate={{ placeholder: "Search for rooms..." }}
          onChange={searchChanged}
        >
          <Configure hitsPerPage={10} />
          {/* </div> */}
          <SearchAndResults className="right-panel">
            <SearchBox autofocus />
            <Stats />
            <Hits hitComponent={Hit} />
            <Pagination />
          </SearchAndResults>
        </InstantSearch>
      </Styles>
    </SearchBarWrapper>
  );
}
