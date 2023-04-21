import React from 'react'
import { ChatBox, RootContainer, TextInput } from './styled'
import useTextFieldControl from './hooks/useTextFieldControl'
import ChatLineContainer from './components/ChatLineContainer'
import useChatData from './hooks/useChatData'
import { ChatFrameProps } from './types'

export default function ChatFrame(props: ChatFrameProps) {
  const { messageList, text, setText, sendMessage } = props
  const { isOverflow, textFieldRef, row } = useTextFieldControl(text, setText)
  const { fetchData } = useChatData()

  return (
    <RootContainer>
      <ChatBox>
        <ChatLineContainer Chat={messageList} Loader={fetchData} curRow={row} />
      </ChatBox>
      <TextInput
        inputRef={textFieldRef}
        multiline
        maxRows={4}
        value={text}
        onInput={() => {}}
        onChange={(e) => {
          if (textFieldRef.current) {
            isOverflow(e.target.value)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            sendMessage()
            setText('')
            event.preventDefault()
          }
        }}
      />
    </RootContainer>
  )
}
