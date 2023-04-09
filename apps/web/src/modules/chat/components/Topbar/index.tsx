import React from 'react'
import Typography from '@mui/material/Typography'
import ChatName from './components/ChatName'
import ListGroup from './components/ListGroup'
import { RootContainer } from './styled'

export default function Topbar() {
  return (
    <RootContainer>
      <ListGroup />
      <ChatName />
    </RootContainer>
  )
}
