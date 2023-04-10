import React from 'react'
import Typography from '@mui/material/Typography'
import { RootContainer, UserContainer, ChatChoiceContainer, IconContainer } from './styled'
import { LogoutOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'
import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'

export default function Sidebar() {
  return (
    <RootContainer>
      <ChatChoiceContainer>
        <ChatNameDisplay isGroup={false} isOnline={true} name="Ice" />
        <ChatNameDisplay isGroup={false} isOnline={false} name="Fain" />
      </ChatChoiceContainer>
      <UserContainer>
        <ChatNameDisplay isGroup={false} isOnline={true} name="P" />
        <IconContainer>
          <LogoutOutlined sx={{ fill: 'white', cursor: 'pointer' }} />
          <KeyboardArrowUpOutlined sx={{ fill: 'white', cursor: 'pointer' }} />
        </IconContainer>
      </UserContainer>
    </RootContainer>
  )
}
