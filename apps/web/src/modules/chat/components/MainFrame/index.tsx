import React from 'react'
import { RootContainer } from './styled'
import Sidebar from './components/Sidebar'
import ChatFrame from './components/ChatFrame'
import { MainFrameProps } from './types'

export default function MainFrame(props: MainFrameProps) {
  const {
    groupList,
    clientList,
    logout,
    isDM,
    messageList,
    text,
    setText,
    sendMessage,
    focus,
    setFocus,
  } = props
  return (
    <RootContainer>
      <Sidebar
        groupList={groupList}
        clientList={clientList}
        logout={logout}
        isDM={isDM}
        focus={focus}
        setFocus={setFocus}
      />
      <ChatFrame
        messageList={messageList}
        text={text}
        setText={setText}
        sendMessage={sendMessage}
      />
    </RootContainer>
  )
}
