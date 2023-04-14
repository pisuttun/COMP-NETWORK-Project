import React from 'react'
import { ChatBox, RootContainer, TextInput } from './styled'
import useTextFieldControl from './hooks/useTextFieldControl'
import ChatLineContainer from './components/ChatLineContainer'
import useChatData from './hooks/useChatData'

export default function ChatFrame() {
  const { value, isOverflow, textFieldRef,row } = useTextFieldControl()
  const { fetchData, chat } = useChatData()

  return (
    <RootContainer>
      <ChatBox>
        <ChatLineContainer Chat={chat} Loader={fetchData} curRow={row}/>
      </ChatBox>
      <TextInput
        inputRef={textFieldRef}
        multiline
        maxRows={4}
        value={value}
        onInput={() => {}}
        onChange={(e) => {
          if (textFieldRef.current) {
            isOverflow(e.target.value)
          }
        }}
      />
    </RootContainer>
  )
}
