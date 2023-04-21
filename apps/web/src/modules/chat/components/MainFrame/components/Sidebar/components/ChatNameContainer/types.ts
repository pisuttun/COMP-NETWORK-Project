import { ClientStatus, GroupInfoDto } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface ChatNameContainerProps {
  chatChoice?: NameDisplay[]
  groupList?: GroupInfoDto[]
  isDM: boolean
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
}
export interface NameDisplay {
  userId: string
  status: ClientStatus
  nickname: string
}
