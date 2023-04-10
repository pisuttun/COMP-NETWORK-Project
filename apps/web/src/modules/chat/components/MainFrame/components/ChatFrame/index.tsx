import React from 'react'
import { ChatBox, RootContainer, TextInput } from './styled'
import useTextFieldControl from './hooks/useTextFieldControl'
import ChatLine from './components/ChatLine'

export default function ChatFrame() {
  const { value, isOverflow, textFieldRef } = useTextFieldControl()

  return (
    <RootContainer>
      <ChatBox>
        <ChatLine sender="prias" time="24/3/2023 18:00" message="test1" />
        <ChatLine sender="prias" time="24/3/2023 18:00" message="test1" />
        <ChatLine sender="prias" time="24/3/2023 18:00" message="test1" />
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
