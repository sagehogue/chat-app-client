import React from "react";
import styled from "styled-components";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectHits,
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
  background-color: ${Theme.theme3.color2};
  font-family: sans-serif;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  width: ${Theme.ui.modalWidth};
  height: ${Theme.ui.modalHeight};
  margin: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow-y: scroll;
  & .ais-SearchBox,
  .ais-Stats {
    text-align: center;
  }
  .ais-Hits-item {
    &:nth-of-type(even) {
      //
    }
    &:nth-of-type(odd) {
      //
    }
  }
`;

const Styles = styled.div`
  padding: 1rem;
  margin: 0 auto auto auto;
`;

const SearchAndResults = styled.div`
  margin: 1rem auto 0 auto;
  & .ais-Stats-text {
    color: ${Theme.theme3.highlight};
  }
`;

const SearchHeading = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${Theme.offWhite};
  @media screen and (min-width: 700px) {
    margin-bottom: 3rem;
  }
`;

const SearchResults = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  // min-height: 10rem;
  // min-width: 35rem;
  & > div {
    flex-shrink: 1;
    flex-grow: 1;
    margin: 0.5rem;
  }
`;

const CenterContent = styled.div`
  margin-top: auto;
  & .ais-Pagination-list {
    width: 25%;
    display: flex;
    flex-direction: row;
    margin: auto;
    text-align: center;
    justify-content: space-around;
  }
`;

const client = algoliasearch("333WBDSI2L", "402eef045334263775aa43830a7952d5");

export default function UserSearchBar({ visible, closeHandler, joinHandler }) {
  const searchChanged = (query) => {
    if (query.length) {
      this.showResults = true;
    } else {
      this.showResults = false;
    }
  };

  const Hits = ({ hits }) => (
    <SearchResults>
      {hits.map((hit) => (
        <Hit
          key={hit.objectID}
          hit={hit}
          handleClientJoin={joinHandler}
          closeHandler={closeHandler}
        >
          {hit.name}
        </Hit>
      ))}
    </SearchResults>
    // return the DOM output
  );

  // 2. Connect the component using the connector
  const CustomHits = connectHits(Hits);
  return (
    <SearchBarWrapper visible={visible}>
      <Styles className="ais-InstantSearch">
        <SearchHeading>Rooms</SearchHeading>
        <InstantSearch
          indexName="room_search"
          searchClient={client}
          translate={{ placeholder: "Search for rooms..." }}
          onChange={searchChanged}
        >
          <Configure hitsPerPage={20} />
          {/* </div> */}
          <SearchAndResults className="right-panel">
            <SearchBox autofocus />
            <Stats />
            <CustomHits />
            {/* <Hits hitComponent={hitComponent} /> */}
            <CenterContent>
              <Pagination />
            </CenterContent>
          </SearchAndResults>
        </InstantSearch>
      </Styles>
    </SearchBarWrapper>
  );
}
