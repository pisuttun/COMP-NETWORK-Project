import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Topbar from '../components/Topbar'
import MainFrame from '../components/MainFrame'
import { FullScreenGrid } from './styled'
import { Grid } from '@mui/material'
import useAuth from './hooks/useAuth'
import useChatInfo from './hooks/useChatInfo'

export default function ChatPage() {
  const { logout } = useAuth()
  const { groupList, clientList, isDM, setIsDM } = useChatInfo()

  return (
    <FullScreenGrid container direction="column" justifyContent="flex-start" alignItems="stretch">
      <Grid item>
        <Topbar isDM={isDM} setIsDM={setIsDM} />
      </Grid>
      <Grid item container xs>
        <MainFrame groupList={groupList} clientList={clientList} logout={logout} isDM={isDM} />
      </Grid>
    </FullScreenGrid>
  )
}
