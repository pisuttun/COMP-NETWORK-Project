import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Topbar from '../components/Topbar'
import MainFrame from '../components/MainFrame'
import { FullScreenGrid } from './styled'
import { Grid } from '@mui/material'
import useAuth from './hooks/useAuth'
import useChatInfo from './hooks/useChatInfo'

export default function ChatPage() {
  const { isVerify } = useAuth()
  const { getAllClient, clientList } = useChatInfo()
  useEffect(() => {
    if (isVerify) {
      getAllClient()
    }
  }, [getAllClient, isVerify])

  return (
    <FullScreenGrid container direction="column" justifyContent="flex-start" alignItems="stretch">
      <Grid item>
        <Topbar />
      </Grid>
      <Grid item container xs>
        <MainFrame ClientList={clientList} />
      </Grid>
    </FullScreenGrid>
  )
}
