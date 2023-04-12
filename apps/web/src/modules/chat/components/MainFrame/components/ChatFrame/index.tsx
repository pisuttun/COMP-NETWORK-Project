import React from 'react'
import { ChatBox, RootContainer, TextInput } from './styled'
import useTextFieldControl from './hooks/useTextFieldControl'
import ChatLineContainer from './components/ChatLineContainer'
import useChatData from './hooks/useChatData'

export default function ChatFrame() {
  const { value, isOverflow, textFieldRef } = useTextFieldControl()
  const { fetchData, chat } = useChatData()

  return (
    <RootContainer>
      <ChatBox>
        <ChatLineContainer Chat={chat} Loader={fetchData} />
      </ChatBox>
      <TextInput
        inputRef={textFieldRef}
        placeholder="Message Prias"
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
