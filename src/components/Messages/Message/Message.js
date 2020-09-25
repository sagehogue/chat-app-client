import React from 'react'

import styled from 'styled-components'

import { FaRegSmileBeam } from 'react-icons/fa'

// TODOS:

// figure out how to lookup user's profile pic on firebase
// Move profile to the side of the message instead of above it.




const MessageWrapper = styled.div`
max-width: 100%;
position: relative;
  display: flex;
  justify-content: flex-start;
  margin: .55rem 1rem 0 1rem;
  & > :nth-child(1) {
      /* margin: ${ props => props.sentByUser ? "0 auto auto 0" : "auto"}; */
      /* min-width: ${ props => props.sentByUser ? "0" : "50vw"}; */
  }
  & > :nth-child(2) {
    /* margin: ${ props => props.showProfile ? ".3rem 1rem 0 1rem" : "0"}; */
    /* min-width: ${ props => props.sentByUser ? "50vw" : "0"}; */
  }
  @media screen and (min-width: 900px) {
    padding:  1rem .5rem;
  }
`

const TextBubble = styled.p`
text-align: center;
background-color: ${props => props.sentByUser ? "#2979ff" : "#f3f3f3"};
padding: .5rem .25rem;
border-radius: 1rem;
margin: ${props => props.showProfile ? "3.3rem auto 0 0" : "0 auto 0 0"};
word-wrap: break-word;
max-width: 100%;
&::after {
    font-size: .8rem;
    position: absolute;
    right: 0;
    bottom: -1rem;
    color: grey;
    content: '${props => props.timestamp}';
    opacity: 0;
    transition: all .3s;
    }
&:hover {
    &::after {
        opacity: 1;
    }
}
/* @media screen and (min-width: 900px) {
    padding:  1rem .5rem;
  } */
`

const Profile = styled.div`
text-align: center;
position: absolute;
top: -.1rem;
left: 0;
display: ${props => props.showProfile ? "flex" : "none"};
flex-direction: column;
@media screen and (min-width: 900px) {

  }
  `

const ProfilePic = styled.div`
font-size: 1.5rem;

`;
const Username = styled.span``;

const Timestamp = styled.span`

`

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
        <MessageWrapper showProfile={shouldDisplayUsername} sentByUser={sentByUser}>
            <Profile showProfile={shouldDisplayUsername}>
                <ProfilePic>
                    <FaRegSmileBeam />
                </ProfilePic>
                <Username>{author}</Username>
            </Profile>
            <TextBubble showProfile={shouldDisplayUsername} sentByUser={sentByUser} timestamp={timeSent}>{text}</TextBubble>
        </MessageWrapper>
    )
}
