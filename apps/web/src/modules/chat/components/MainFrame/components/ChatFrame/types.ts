import { NewMessageDto } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface ChatFrameProps {
  messageList?: NewMessageDto[]
  text: string
  setText: Dispatch<SetStateAction<string>>
  sendMessage: () => void
  getMessage: () => void
  focus: string
}
