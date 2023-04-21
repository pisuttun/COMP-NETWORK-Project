import { ClientStatus } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface ChatNameDisplayProps {
  isGroup: boolean
  status?: ClientStatus
  name: string
  focus: string
  setFocus?: Dispatch<SetStateAction<string>>
  isChoice?: boolean
  id?: string
}
