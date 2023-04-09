import React from 'react'
import Typography from '@mui/material/Typography'
import { RootContainer, UserContainer, ChatChoiceContainer, IconContainer } from './styled'
import { LogoutOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'

export default function Sidebar() {
  return (
    <RootContainer>
      <ChatChoiceContainer>
        <Typography sx={{ color: 'white' }}>User1</Typography>
        <Typography sx={{ color: 'white' }}>User2</Typography>
      </ChatChoiceContainer>
      <UserContainer>
        <Typography sx={{ color: 'white' }}> Test</Typography>
        <IconContainer>
          <LogoutOutlined sx={{ fill: 'white', cursor: 'pointer' }} />
          <KeyboardArrowUpOutlined sx={{ fill: 'white', cursor: 'pointer' }} />
        </IconContainer>
      </UserContainer>
    </RootContainer>
  )
}
