import React from 'react'

import { FaRegSmileBeam } from 'react-icons/fa'

// TODOS:

// figure out how to lookup user's profile pic on firebase




const MessageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: .3rem;
  overflow: hidden;
  width: 100%;
  & > :nth-child(1) {
      margin: ${props.sentByUser ? "0 auto auto 0" : "auto"};
      min-width: ${props.sentByUser ? "0" : "50vw"};
  }
  & > :nth-child(2) {
    margin: ${props.sentByUser ? "auto" : "0 0 auto auto"};
    min-width: ${props.sentByUser ? "50vw" : "0"};
  }
`

const Profile = styled.div`
display: flex;
flex-direction: column;`

export default function Message({ message, user, shouldDisplayUsername = false }) {
    console.log(message)
    let text, user, timeSent, profilePic;
    timeSent = message.time
    text = message.text
    user = message.user
    const trimmedUsername = user.trim().toLowerCase();

    if (user === trimmedUsername) {
        isSentByCurrentUser = true;
    }
    return (
        <MessageWrapper>
            <Profile>
                <ProfilePic />
                <Username />
            </Profile>
            <Message></Message>
        </MessageWrapper>
    )
}
