import React from 'react'
import Typography from '@mui/material/Typography'
import { RootContainer } from './styled'
import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import { ClientStatus } from '@chatAIP/dtos'
import { ChatNameProps } from './types'

export default function ChatName(props: ChatNameProps) {
  const { focusText, focusOnline } = props
  return (
    <RootContainer>
      <ChatNameDisplay
        isGroup={focusOnline ? false : true}
        name={focusText}
        status={focusOnline}
        focus={''}
        isChoice={true}
      />
    </RootContainer>
  )
}
