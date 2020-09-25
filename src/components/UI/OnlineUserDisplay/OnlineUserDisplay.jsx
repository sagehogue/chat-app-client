import React from 'react'

import styled from 'styled-components'

const Display = styled.div`
width: 100%;
padding: 1rem 2rem;
`

export default function OnlineUserDisplay({ data }) {
    return (
        <Display>{data.userCount} online in ${data.roomCount} rooms.</Display>
    )
}
