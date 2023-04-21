import { ClientInfoDto, GroupInfoDto, NewMessageDto } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface MainFrameProps {
  clientList?: ClientInfoDto[]
  logout: () => void
  isDM: boolean
  groupList?: GroupInfoDto[]
  messageList?: NewMessageDto[]
  text: string
  setText: Dispatch<SetStateAction<string>>
  sendMessage: () => void
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
}
