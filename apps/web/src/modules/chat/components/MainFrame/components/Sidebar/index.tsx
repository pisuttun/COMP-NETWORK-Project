import React from 'react'
import { RootContainer, UserContainer, ChatChoiceContainer, IconContainer } from './styled'
import { LogoutOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'
import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import ChatNameContainer from './components/ChatNameContainer'
import { SidebarProps } from './types'
import { ClientStatus } from '@chatAIP/dtos'
import GroupNameContainer from './components/GroupNameContainer'

export default function Sidebar(props: SidebarProps) {
  const {
    joinedGroupList,
    unjoinGroupList,
    clientList,
    logout,
    isDM,
    focus,
    setFocus,
    createNewGroup,
    joinGroup,
    leaveGroup,
  } = props
  return (
    <RootContainer>
      <ChatChoiceContainer>
        {isDM ? (
          <ChatNameContainer chatChoice={clientList} focus={focus} setFocus={setFocus} />
        ) : (
          <GroupNameContainer
            joinedGroupList={joinedGroupList}
            unjoinGroupList={unjoinGroupList}
            focus={focus}
            setFocus={setFocus}
            createNewGroup={createNewGroup}
            joinGroup={joinGroup}
            leaveGroup={leaveGroup}
          />
        )}
      </ChatChoiceContainer>
      <UserContainer>
        <ChatNameDisplay
          isGroup={false}
          status={ClientStatus.AVAILABLE}
          name={localStorage.getItem('name')!}
          focus={'false'}
          isChoice={true}
        />
        <IconContainer>
          <LogoutOutlined sx={{ fill: 'white', cursor: 'pointer' }} onClick={logout} />
          <KeyboardArrowUpOutlined sx={{ fill: 'white', cursor: 'pointer' }} />
        </IconContainer>
      </UserContainer>
    </RootContainer>
  )
}
