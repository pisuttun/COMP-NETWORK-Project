import { ClientInfoDto, GroupInfoDto, NewMessageDto } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface MainFrameProps {
  clientList?: ClientInfoDto[]
  logout: () => void
  isDM: boolean
  joinedGroupList?: GroupInfoDto[]
  unjoinGroupList?: GroupInfoDto[]
  messageList?: NewMessageDto[]
  text: string
  setText: Dispatch<SetStateAction<string>>
  sendMessage: () => void
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
  getMessage: () => Promise<void>
  createNewGroup: (name: string) => Promise<void>
  joinGroup: (groupId: string) => Promise<void>
  leaveGroup: (groupId: string) => Promise<void>
}
