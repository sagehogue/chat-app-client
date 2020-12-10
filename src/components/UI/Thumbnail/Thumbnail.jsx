import React from 'react'
import styled from 'styled-components'

const Style = styled.div`
 width: 2rem;
 height: 2rem;`

 const Img = styled.img`
 width: 100%;
 height: 100%;`

export default function Thumbnail({imageURL}) {
    console.log(imageURL)
    return (
        <Style>
            <Img src={imageURL}/>
        </Style>
    )
}
