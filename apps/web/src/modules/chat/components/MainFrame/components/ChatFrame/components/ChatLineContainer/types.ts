import { NewMessageDto } from '@chatAIP/dtos'

export interface ChatLineContainerProps {
  Chat?: NewMessageDto[]
  Loader: () => void
  curRow: number
}
