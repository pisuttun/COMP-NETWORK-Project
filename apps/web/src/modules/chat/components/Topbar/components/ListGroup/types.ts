import { Dispatch, SetStateAction } from 'react'

export interface ListGroupProps {
  isDM: boolean
  setIsDM: Dispatch<SetStateAction<boolean>>
}
