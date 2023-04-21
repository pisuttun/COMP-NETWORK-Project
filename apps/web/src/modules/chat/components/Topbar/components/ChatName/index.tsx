import React from 'react'
import Typography from '@mui/material/Typography'
import { RootContainer } from './styled'
import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import { ClientStatus } from '@chatAIP/dtos'

export default function ChatName() {
  return (
    <RootContainer>
      <ChatNameDisplay isGroup={false} name="Prias" status={ClientStatus.AVAILABLE} focus={''} />
    </RootContainer>
  )
}
