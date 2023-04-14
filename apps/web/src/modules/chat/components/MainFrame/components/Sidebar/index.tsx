import React from 'react'
import Typography from '@mui/material/Typography'
import { RootContainer, UserContainer, ChatChoiceContainer, IconContainer } from './styled'
import { LogoutOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'
import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import ChatNameContainer from './components/ChatNameContainer'
import { ChatNameHolder } from './placeholder'

export default function Sidebar() {
  return (
    <RootContainer>
      <ChatChoiceContainer>
        <ChatNameContainer ChatChoice={ChatNameHolder} />
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
