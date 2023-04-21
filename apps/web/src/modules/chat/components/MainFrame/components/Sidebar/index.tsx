import React from 'react'
import { RootContainer, UserContainer, ChatChoiceContainer, IconContainer } from './styled'
import { LogoutOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'
import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import ChatNameContainer from './components/ChatNameContainer'
import { SidebarProps } from './types'
import { ClientStatus } from '@chatAIP/dtos'

export default function Sidebar(props: SidebarProps) {
  const { groupList, clientList, logout, isDM } = props
  return (
    <RootContainer>
      <ChatChoiceContainer>
        <ChatNameContainer isDM={isDM} chatChoice={clientList} groupList={groupList} />
      </ChatChoiceContainer>
      <UserContainer>
        <ChatNameDisplay isGroup={false} status={ClientStatus.AVAILABLE} name="P" />
        <IconContainer>
          <LogoutOutlined sx={{ fill: 'white', cursor: 'pointer' }} onClick={logout} />
          <KeyboardArrowUpOutlined sx={{ fill: 'white', cursor: 'pointer' }} />
        </IconContainer>
      </UserContainer>
    </RootContainer>
  )
}
