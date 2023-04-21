import { ClientInfoDto } from '@chatAIP/dtos'

export interface SidebarProps {
  ClientList?: ClientInfoDto[]
  logout: () => void
}
