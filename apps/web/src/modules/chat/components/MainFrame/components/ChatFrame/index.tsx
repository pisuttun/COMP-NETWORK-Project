import React from 'react'
import { ChatBox, RootContainer, TextInput } from './styled'
import useTextFieldControl from './hooks/useTextFieldControl'
import ChatLineContainer from './components/ChatLineContainer'
import { ChatFrameProps } from './types'

export default function ChatFrame(props: ChatFrameProps) {
  const { messageList, text, setText, sendMessage, getMessage } = props
  const { isOverflow, textFieldRef, row } = useTextFieldControl(text, setText)

  return (
    <RootContainer>
      <ChatBox>
        <ChatLineContainer Chat={messageList} Loader={getMessage} curRow={row} />
      </ChatBox>
      <TextInput
        inputRef={textFieldRef}
        multiline
        maxRows={4}
        value={text}
        onInput={() => {}}
        onChange={(e) => {
          if (textFieldRef.current) {
            console.log('Text Call')
            isOverflow(e.target.value)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey && text.trim() !== '') {
            sendMessage()
            setText('')
            event.preventDefault()
            isOverflow('')
          }
        }}
      />
    </RootContainer>
  )
}
