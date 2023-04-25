import { ClientStatus } from '@chatAIP/dtos'
import { Dispatch, SetStateAction } from 'react'

export interface TopbarProps {
  isDM: boolean
  setIsDM: Dispatch<SetStateAction<boolean>>
  focusText: string
  focusOnline?: ClientStatus
}
