import { useSocket } from 'common/context/socketContext'
import { useState } from 'react'

const useShareVariable = () => {
  const [focus, setFocus] = useState<string>('')
  const { socket } = useSocket()

  return { focus, setFocus, socket }
}
export default useShareVariable
