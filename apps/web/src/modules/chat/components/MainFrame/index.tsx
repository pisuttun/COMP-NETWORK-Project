import React from 'react'
import { RootContainer } from './styled'
import Sidebar from './components/Sidebar'
import ChatFrame from './components/ChatFrame'

export default function Topbar() {
  return (
    <RootContainer>
      <Sidebar />
      <ChatFrame />
    </RootContainer>
  )
}
