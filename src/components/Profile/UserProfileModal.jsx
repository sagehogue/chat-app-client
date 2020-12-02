import React from 'react'
import styled from 'styled-components'
import Theme from '../../util/Theme/Theme'
import { Modal } from "../../components/UI/Modal/NewModal";

const ProfileContainer = styled(Modal)`
  
 
  
  
  background-color: ${Theme.theme3.black};
  border-radius: ${Theme.borderRadius};
  cursor: default;
  
  flex-direction: column;
  
  align-self: flex-start;
  transform: translateY(1.5rem);
`;

export default function UserProfileModal({profileDisplayState,
    handleCloseProfile, profilePicURL, id, socket}) {
    return (
        <ProfileContainer  shouldDisplay={profileDisplayState}>
            
        </ProfileContainer>
    )
}
