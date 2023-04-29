import React from 'react'
import { ChatBox, RootContainer, TextInput } from './styled'
import useTextFieldControl from './hooks/useTextFieldControl'
import ChatLineContainer from './components/ChatLineContainer'
import { ChatFrameProps } from './types'
import Image from 'next/image'
import NofriendGIF from '../../../../../../common/utils/img/NofriendGIF.gif'
import { Typography } from '@mui/material'

export default function ChatFrame(props: ChatFrameProps) {
  const { messageList, text, setText, sendMessage, getMessage, focus } = props
  const { isOverflow, textFieldRef, row } = useTextFieldControl(text, setText)
  const isGroup = focus !== 'NF'

  return (
    <RootContainer>
      <ChatBox>
        {isGroup ? (
          <ChatLineContainer Chat={messageList} Loader={getMessage} curRow={row} />
        ) : (
          <>
            <Image
              src={NofriendGIF}
              alt="Please Join Group"
              width={500}
              height={500}
              style={{ alignSelf: 'center' }}
            />
            <Typography sx={{ color: '#EFE0FF', alignSelf: 'center' }}>
              {"you havn't join any group yet"}
            </Typography>
          </>
        )}
      </ChatBox>
      {isGroup && (
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
      )}
    </RootContainer>
  )
}
