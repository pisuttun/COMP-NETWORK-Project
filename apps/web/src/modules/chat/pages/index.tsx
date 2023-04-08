import React from 'react'
import Typography from '@mui/material/Typography'
import Topbar from '../components/Topbar'
import MainFrame from '../components/MainFrame'
import { FullScreenGrid } from './styled'
import { Grid } from '@mui/material'

export default function ChatPage() {
  return (
    <FullScreenGrid container direction="column" justifyContent="flex-start" alignItems="stretch">
      <Grid item>
        <Topbar />
      </Grid>
      <Grid item container xs>
        <MainFrame />
      </Grid>
    </FullScreenGrid>
  )
}
