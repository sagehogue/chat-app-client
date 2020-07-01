import React from 'react'
import styled from 'styled-components'
import Theme from '../../../util/Theme/Theme'

import { FaSearch } from 'react-icons/fa'

const SearchBarContainer = styled.div`
position: relative;
width: 91%;
border-radius: 15px;
overflow: hidden;
margin: .75rem auto .75rem auto;
height: 2rem;
background-color: ${Theme.offWhite};
& svg {
    position: absolute;
    top: 35%;
    left: 5%;
    color: black;
    font-size: .6rem;
}
`
const SearchInput = styled.input`
width: 100%;
border: none;
height: inherit;
outline: none;
padding: 5% 5% 5% 2rem;
`

export default function SearchBar() {
    return (
        <SearchBarContainer>
            <FaSearch />
            <SearchInput placeholder={' ....'} />
        </SearchBarContainer>
    )
}

