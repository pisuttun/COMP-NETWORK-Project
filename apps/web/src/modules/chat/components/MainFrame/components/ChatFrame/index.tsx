import React from 'react'
import { ChatBox, RootContainer, TextInput } from './styled'
import useTextFieldControl from './hooks/useTextFieldControl'
import ChatLine from './components/ChatLine'
import ChatLineContainer from './components/ChatLineContainer'
import { chatLog } from './placeholder'

export default function ChatFrame() {
  const { value, isOverflow, textFieldRef } = useTextFieldControl()

  return (
    <RootContainer>
      <ChatBox>
        <ChatLineContainer Chat={chatLog[0]} />
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
