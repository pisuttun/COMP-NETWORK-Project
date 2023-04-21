import React from 'react'
import Topbar from '../components/Topbar'
import MainFrame from '../components/MainFrame'
import { FullScreenGrid } from './styled'
import { Grid } from '@mui/material'
import useAuth from './hooks/useAuth'
import useChatInfo from './hooks/useChatInfo'
import useShareVariable from './hooks/useShareVariable'
import useMessageInfo from './hooks/useMessageInfo'

export default function ChatPage() {
  const { focus, setFocus } = useShareVariable()
  const { logout } = useAuth()
  const { groupList, clientList, isDM, setIsDM } = useChatInfo({ focus, setFocus })
  const { messageList, text, setText, sendMessage, getMessage } = useMessageInfo({
    focus,
    setFocus,
  })

  return (
    <FullScreenGrid container direction="column" justifyContent="flex-start" alignItems="stretch">
      <Grid item>
        <Topbar isDM={isDM} setIsDM={setIsDM} />
      </Grid>
      <Grid item container xs>
        <MainFrame
          groupList={groupList}
          clientList={clientList}
          logout={logout}
          isDM={isDM}
          messageList={messageList}
          text={text}
          setText={setText}
          sendMessage={sendMessage}
          focus={focus}
          setFocus={setFocus}
          getMessage={getMessage}
        />
      </Grid>
    </FullScreenGrid>
  )
}
