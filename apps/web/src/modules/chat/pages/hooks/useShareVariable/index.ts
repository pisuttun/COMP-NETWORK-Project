import { useState } from 'react'

const useShareVariable = () => {
  const [focus, setFocus] = useState<string>('')
  return { focus, setFocus }
}
export default useShareVariable
