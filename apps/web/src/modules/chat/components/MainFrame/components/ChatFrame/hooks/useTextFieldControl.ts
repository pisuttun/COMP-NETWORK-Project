import { Dispatch, SetStateAction, useRef, useState } from 'react'

const useTextFieldControl = (value: string, setValue: Dispatch<SetStateAction<string>>) => {
  const line = useRef(0)
  const [row, setRow] = useState<number>(0)
  const textFieldRef = useRef<HTMLTextAreaElement>(null)

  const isOverflow = (e: string) => {
    if (textFieldRef.current) {
      if (line.current === 0) {
        line.current = textFieldRef.current.clientHeight * 4
      }

      const hiddenDiv = document.createElement('div')
      hiddenDiv.style.cssText = `
        position: absolute;
        top: -9999px;
        width: ${textFieldRef.current.clientWidth}px;
        padding: ${getComputedStyle(textFieldRef.current).padding};
        font: ${getComputedStyle(textFieldRef.current).font};
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-wrap: break-word;
        visibility: hidden;
      `

      hiddenDiv.innerHTML = e.replace(/\n/g, '<br>') + ' '
      document.body.appendChild(hiddenDiv)

      // Measure the height of the text content
      const contentHeight = hiddenDiv.clientHeight

      // Remove the hidden div from the DOM
      document.body.removeChild(hiddenDiv)

      if (contentHeight <= line.current) {
        setRow(Math.floor((contentHeight * 4) / line.current - 1))
        setValue(e)
      }
    }
  }

  return { value, isOverflow, textFieldRef, row }
}
export default useTextFieldControl
