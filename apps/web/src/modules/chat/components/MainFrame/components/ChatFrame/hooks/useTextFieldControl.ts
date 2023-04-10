import { useRef, useState } from 'react'

const useTextFieldControl = () => {
  const [value, setValue] = useState('')
  const [line, setLine] = useState<number>(0)
  const textFieldRef = useRef(null)

  const isOverflow = (inputElement: HTMLTextAreaElement, e: string) => {
    if (line === 0) {
      setLine(inputElement.clientHeight * 4)
    }
    if (inputElement.scrollHeight <= line) {
      setValue(e)
    } else {
    }
  }

  return { value, isOverflow, textFieldRef }
}
export default useTextFieldControl
