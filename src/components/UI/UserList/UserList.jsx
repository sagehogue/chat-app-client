import React from 'react'
import styled from 'styled-components'

// Needs a greyed out backdrop that can close the userlist if clicked

const DisplayBox = styled.div``

const UserList = ({users, location}) => {
    return (<DisplayBox>
        <h3>Active Users in {location}</h3>
        <input type="text"/>
        </DisplayBox>)
}

export default UserList