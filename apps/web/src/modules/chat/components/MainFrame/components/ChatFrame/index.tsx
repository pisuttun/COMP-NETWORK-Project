import React, { useEffect, useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import { ChatBox, RootContainer, TextInput } from './styled'
import { TextField } from '@mui/material'
import useTextFieldControl from './hooks/useTextFieldControl'

export default function ChatFrame() {
  const { value, isOverflow, textFieldRef } = useTextFieldControl()

  return (
    <RootContainer>
      <ChatBox></ChatBox>
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
