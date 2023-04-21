import { NewMessageDto } from '@chatAIP/dtos'

export interface ChatLineContainerProps {
  Chat?: NewMessageDto[]
  Loader: () => Promise<void>
  curRow: number
}
