import React from 'react'
import { RootContainer } from './styled'
import Sidebar from './components/Sidebar'
import ChatFrame from './components/ChatFrame'
import { MainFrameProps } from './types'

export default function MainFrame(props: MainFrameProps) {
  const {
    joinedGroupList,
    unjoinGroupList,
    clientList,
    logout,
    isDM,
    messageList,
    text,
    setText,
    sendMessage,
    focus,
    setFocus,
    getMessage,
    createNewGroup,
    joinGroup,
    leaveGroup,
  } = props
  return (
    <RootContainer>
      <Sidebar
        joinedGroupList={joinedGroupList}
        unjoinGroupList={unjoinGroupList}
        clientList={clientList}
        logout={logout}
        isDM={isDM}
        focus={focus}
        setFocus={setFocus}
        createNewGroup={createNewGroup}
        joinGroup={joinGroup}
        leaveGroup={leaveGroup}
      />
      <ChatFrame
        messageList={messageList}
        text={text}
        setText={setText}
        sendMessage={sendMessage}
        getMessage={getMessage}
      />
    </RootContainer>
  )
}
