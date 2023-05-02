import React, { useEffect, useState } from 'react'
import { RootContainer, UserContainer, ChatChoiceContainer, IconContainer } from './styled'
import {
  LogoutOutlined,
  KeyboardArrowUpOutlined,
  KeyboardArrowDownOutlined,
} from '@mui/icons-material'
import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import ChatNameContainer from './components/ChatNameContainer'
import { SidebarProps } from './types'
import { ClientStatus } from '@chatAIP/dtos'
import GroupNameContainer from './components/GroupNameContainer'
import ProfileSettingContainer from './components/ProfileSettingContainer'

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
  const [userName, setUserName] = useState('')
  const [avai, setAvai] = useState(true)
  const [isSettingShow, setIsSettingShow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserName(localStorage.getItem('name')!)
      setAvai(localStorage.getItem('isInvisible') === 'true' ? false : true)
    }
  }, [clientList])

  return (
    <RootContainer>
      <ChatChoiceContainer>
        {isDM ? (
          <ChatNameContainer
            chatChoice={clientList}
            focus={focus}
            setFocus={setFocus}
            isSetting={isSettingShow}
          />
        ) : (
          <GroupNameContainer
            joinedGroupList={joinedGroupList}
            unjoinGroupList={unjoinGroupList}
            focus={focus}
            setFocus={setFocus}
            createNewGroup={createNewGroup}
            joinGroup={joinGroup}
            leaveGroup={leaveGroup}
            isSetting={isSettingShow}
          />
        )}
      </ChatChoiceContainer>
      <div style={{ width: '100%' }}>
        {isSettingShow && <ProfileSettingContainer />}
        <UserContainer>
          <ChatNameDisplay
            isGroup={false}
            status={avai ? ClientStatus.AVAILABLE : ClientStatus.OFFLINE}
            name={userName}
            focus={'false'}
            isChoice={true}
          />
          <IconContainer>
            <LogoutOutlined sx={{ fill: 'white', cursor: 'pointer' }} onClick={logout} />
            {!isSettingShow ? (
              <KeyboardArrowUpOutlined
                sx={{ fill: 'white', cursor: 'pointer' }}
                onClick={() => {
                  setIsSettingShow((prev) => !prev)
                }}
              />
            ) : (
              <KeyboardArrowDownOutlined
                sx={{ fill: 'white', cursor: 'pointer' }}
                onClick={() => {
                  setIsSettingShow((prev) => !prev)
                }}
              />
            )}
          </IconContainer>
        </UserContainer>
      </div>
    </RootContainer>
  )
}
