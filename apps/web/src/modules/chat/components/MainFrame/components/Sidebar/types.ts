import { ClientInfoDto, GroupInfoDto } from '@chatAIP/dtos'

export interface SidebarProps {
  clientList?: ClientInfoDto[]
  groupList?: GroupInfoDto[]
  logout: () => void
  isDM: boolean
}
