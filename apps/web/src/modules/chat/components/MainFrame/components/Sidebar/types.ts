import { ClientInfoDto, GroupInfoDto } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface SidebarProps {
  clientList?: ClientInfoDto[]
  joinedGroupList?: GroupInfoDto[]
  unjoinGroupList?: GroupInfoDto[]
  logout: () => void
  isDM: boolean
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
  createNewGroup: (name: string) => Promise<void>
  joinGroup: (groupId: string) => Promise<void>
  leaveGroup: (groupId: string) => Promise<void>
}
