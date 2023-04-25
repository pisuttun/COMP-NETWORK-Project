import { Dispatch, SetStateAction } from 'react'

export interface useChatInfoParams {
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
}
