import React from 'react'
import Typography from '@mui/material/Typography'
import { RootContainer, UserContainer, ChatChoiceContainer, IconContainer } from './styled'
import { LogoutOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'
import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import ChatNameContainer from './components/ChatNameContainer'
import { ChatNameHolder } from './placeholder'
import { SidebarProps } from './types'
import { ClientStatus } from '@chatAIP/dtos'

export default function Sidebar(props: SidebarProps) {
  const { ClientList } = props
  return (
    <RootContainer>
      <ChatChoiceContainer>
        <ChatNameContainer ChatChoice={ClientList} />
      </ChatChoiceContainer>
      <UserContainer>
        <ChatNameDisplay isGroup={false} status={ClientStatus.AVAILABLE} name="P" />
        <IconContainer>
          <LogoutOutlined sx={{ fill: 'white', cursor: 'pointer' }} />
          <KeyboardArrowUpOutlined sx={{ fill: 'white', cursor: 'pointer' }} />
        </IconContainer>
      </UserContainer>
    </RootContainer>
  )
}
