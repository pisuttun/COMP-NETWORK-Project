import { ClientStatus } from '@chatAIP/dtos'

export interface ChatNameDisplayProps {
  isGroup: boolean
  status: ClientStatus
  name: string
}
