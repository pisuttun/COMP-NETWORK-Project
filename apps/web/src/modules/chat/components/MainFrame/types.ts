import { ClientInfoDto, GroupInfoDto } from '@chatAIP/dtos'

export interface MainFrameProps {
  clientList?: ClientInfoDto[]
  logout: () => void
  isDM: boolean
  groupList?: GroupInfoDto[]
}
