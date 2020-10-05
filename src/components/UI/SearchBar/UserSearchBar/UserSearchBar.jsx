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
  background-color: ${Theme.offWhite};
  font-family: sans-serif;
  padding: 1em;
  & .ais-SearchBox {
    margin: 1em 0;
  }
`;

const Styles = styled.div`
  padding: 1rem;
  margin: 0 auto auto auto;
`;

const searchClient = algoliasearch(
  "B1G2GM9NG0",
  "aadef574be1f9252bb48d4ea09b5cfe5"
);

const client = algoliasearch("333WBDSI2L", "402eef045334263775aa43830a7952d5");

export default function UserSearchBar({ visible, closeHandler }) {
  return (
    <SearchBarWrapper visible={visible}>
      <Styles className="ais-InstantSearch">
        <h1>Users</h1>
        <InstantSearch indexName="user_search" searchClient={client}>
          {/* <div className="left-panel"> */}
          {/* <ClearRefinements /> */}
          {/* <h2>Brands</h2> */}
          {/* <RefinementList attribute="brand" /> */}
          <Configure hitsPerPage={10} />
          {/* </div> */}
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </Styles>
    </SearchBarWrapper>
  );
}
