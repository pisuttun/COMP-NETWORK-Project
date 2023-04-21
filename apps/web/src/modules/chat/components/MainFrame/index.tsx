import React from 'react'
import { RootContainer } from './styled'
import Sidebar from './components/Sidebar'
import ChatFrame from './components/ChatFrame'
import { MainFrameProps } from './types'

export default function MainFrame(props: MainFrameProps) {
  const { groupList, clientList, logout, isDM } = props
  return (
    <RootContainer>
      <Sidebar groupList={groupList} clientList={clientList} logout={logout} isDM={isDM} />
      <ChatFrame />
    </RootContainer>
  )
}
