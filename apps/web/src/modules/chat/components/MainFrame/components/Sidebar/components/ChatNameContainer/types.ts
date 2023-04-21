import { ClientStatus, GroupInfoDto } from '@chatAIP/dtos'

export interface ChatNameContainerProps {
  chatChoice?: NameDisplay[]
  groupList?: GroupInfoDto[]
  isDM: boolean
}
export interface NameDisplay {
  userId: string
  status: ClientStatus
  nickname: string
}
