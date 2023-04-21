import { Dispatch, SetStateAction } from 'react'

export interface useMessageInfoParams {
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
}
