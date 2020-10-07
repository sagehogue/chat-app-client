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
  z-index: ${Theme.zIndex.modal};
  background-color: ${Theme.colors.primary};
  font-family: sans-serif;
  padding: 1em;

  & .ais-SearchBox {
    margin: 1em 0;
  }
  & .ais-Hits {
    // min-height: 10rem;
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
        <h2>Users</h2>
        <InstantSearch
          indexName="user_search"
          searchClient={client}
          translate={{ placeholder: "Search for users..." }}
          onChange={searchChanged}
        >
          <Configure hitsPerPage={10} />
          {/* </div> */}
          <SearchAndResults className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </SearchAndResults>
        </InstantSearch>
      </Styles>
    </SearchBarWrapper>
  );
}
