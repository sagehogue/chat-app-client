import React from 'react'

import styled from 'styled-components'

import { FaRegSmileBeam } from 'react-icons/fa'

// TODOS:

// figure out how to lookup user's profile pic on firebase




const MessageWrapper = styled.div`
position: relative;
  display: flex;
  justify-content: flex-start;
  margin-top: .3rem;
  width: 100%;
  & > :nth-child(1) {
      margin: ${ props => props.sentByUser ? "0 auto auto 0" : "auto"};
      min-width: ${ props => props.sentByUser ? "0" : "50vw"};
  }
  & > :nth-child(2) {
    margin: ${ props => props.sentByUser ? "auto" : "0 0 auto auto"};
    min-width: ${ props => props.sentByUser ? "50vw" : "0"};
  }
`

const TextBubble = styled.p`
background-color: ${props => props.sentByUser ? "#2979ff" : "#f3f3f3"};
padding: .5rem;
border-radius: 1rem;
margin-top: ${props => props.showProfile ? "1rem" : "0"};
margin-bottom: ${props => props.showProfile ? "1.5rem" : "0"};
transform: translateY(${props => props.showProfile ? "1.5rem" : "0"})
`

const Profile = styled.div`
text-align: center;
position: absolute;
top: 0;
left: 0;
display: ${props => props.showProfile ? "flex" : "none"};
flex-direction: column;`

const ProfilePic = styled.div``;
const Username = styled.span``;

export default function Message({ message, user, shouldDisplayUsername = false }) {
    let text, author, timeSent, profilePic;
    timeSent = message.time
    text = message.text
    author = message.user
    const trimmedAuthorName = author.trim().toLowerCase();
    const sentByUser = (trimmedAuthorName == user ? true : false)
    console.log(`user: ${user}
    sentByUser: ${sentByUser}
    message: ${text}
    author: ${author},
    time sent: ${timeSent}
    shouldDisplayUsername? ${shouldDisplayUsername}`)
    return (
        <MessageWrapper sentByUser={sentByUser}>
            <Profile showProfile={shouldDisplayUsername}>
                <ProfilePic>
                    <FaRegSmileBeam />
                </ProfilePic>
                <Username>{author}</Username>
            </Profile>
            <TextBubble showProfile={shouldDisplayUsername} sentByUser={sentByUser}>{text}</TextBubble>
        </MessageWrapper>
    )
}
