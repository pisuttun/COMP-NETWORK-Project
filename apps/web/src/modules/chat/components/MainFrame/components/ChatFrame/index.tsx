import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { ChatBox, RootContainer, TextInput } from './styled'
import useTextFieldControl from './hooks/useTextFieldControl'
import ChatLineContainer from './components/ChatLineContainer'
import { chatLog } from './placeholder'
import { CircularProgress } from '@mui/material'
import useChatData from './hooks/useChatData'

export default function ChatFrame() {
  const { value, isOverflow, textFieldRef } = useTextFieldControl()
  const { hasMore, fetchData, chat } = useChatData()

  return (
    <RootContainer>
      <ChatBox>
        <ChatLineContainer Chat={chat} />
      </ChatBox>
      <TextInput
        inputRef={textFieldRef}
        multiline
        maxRows={4}
        value={value}
        onInput={() => {}}
        onChange={(e) => {
          if (textFieldRef.current) {
            isOverflow(textFieldRef.current, e.target.value)
          }
        }}
      />
    </RootContainer>
  )
}
