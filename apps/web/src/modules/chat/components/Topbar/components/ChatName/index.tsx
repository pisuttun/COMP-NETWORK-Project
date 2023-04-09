import React from 'react'
import Typography from '@mui/material/Typography'
import { RootContainer } from './styled'

export default function ChatName() {
  return (
    <RootContainer>
      <Typography sx={{ color: 'white' }}>DM</Typography>
    </RootContainer>
  )
}
