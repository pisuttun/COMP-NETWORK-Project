import { ClientInfoDto, GroupInfoDto } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface SidebarProps {
  clientList?: ClientInfoDto[]
  groupList?: GroupInfoDto[]
  logout: () => void
  isDM: boolean
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
}
