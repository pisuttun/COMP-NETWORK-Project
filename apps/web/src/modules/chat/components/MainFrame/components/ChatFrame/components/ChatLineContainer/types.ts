import { ChatLineProps } from '../ChatLine/types'

export interface ChatLineContainerProps {
  Chat?: ChatLineProps[]
  Loader: () => Promise<void>
  curRow: number
}
