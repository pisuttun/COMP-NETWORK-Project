import { ClientStatus, GroupInfoDto } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface GroupNameContainerProps {
  joinedGroupList?: GroupInfoDto[]
  unjoinGroupList?: GroupInfoDto[]
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
  createNewGroup: (name: string) => Promise<void>
  joinGroup: (groupId: string) => Promise<void>
  leaveGroup: (groupId: string) => Promise<void>
}
export interface NameDisplay {
  userId: string
  status: ClientStatus
  nickname: string
}
