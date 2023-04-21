import { Dispatch, SetStateAction } from 'react'

export interface TopbarProps {
  isDM: boolean
  setIsDM: Dispatch<SetStateAction<boolean>>
}
