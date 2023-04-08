import React from 'react'
import Typography from '@mui/material/Typography'
import { RootContainer } from './styled'

export default function ChatFrame() {
  return (
    <RootContainer>
      <Typography sx={{ color: 'white' }}>ChatBox</Typography>
    </RootContainer>
  )
}
