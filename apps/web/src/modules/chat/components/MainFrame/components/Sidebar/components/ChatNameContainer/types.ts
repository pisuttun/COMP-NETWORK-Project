import { ClientStatus, GroupInfoDto } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface ChatNameContainerProps {
  chatChoice?: NameDisplay[]
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
  isSetting: boolean
}
export interface NameDisplay {
  userId: string
  status: ClientStatus
  nickname: string
}
