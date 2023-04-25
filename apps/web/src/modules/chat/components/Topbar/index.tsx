import React from 'react'
import Typography from '@mui/material/Typography'
import ChatName from './components/ChatName'
import ListGroup from './components/ListGroup'
import { RootContainer } from './styled'
import { TopbarProps } from './types'

export default function Topbar(props: TopbarProps) {
  const { isDM, setIsDM, focusText, focusOnline } = props
  return (
    <RootContainer>
      <ListGroup isDM={isDM} setIsDM={setIsDM} />
      <ChatName focusText={focusText} focusOnline={focusOnline} />
    </RootContainer>
  )
}
