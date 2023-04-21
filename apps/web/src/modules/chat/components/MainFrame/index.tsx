import React from 'react'
import { RootContainer } from './styled'
import Sidebar from './components/Sidebar'
import ChatFrame from './components/ChatFrame'
import { MainFrameProps } from './types'

export default function MainFrame(props: MainFrameProps) {
  const { ClientList } = props
  return (
    <RootContainer>
      <Sidebar ClientList={ClientList} />
      <ChatFrame />
    </RootContainer>
  )
}
