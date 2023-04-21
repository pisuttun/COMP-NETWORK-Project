import { ClientStatus } from '@chatAIP/dtos'

export interface ChatNameContainerProps {
  ChatChoice?: NameDisplay[]
}
export interface NameDisplay {
  userId: string
  status: ClientStatus
  nickname: string
}
