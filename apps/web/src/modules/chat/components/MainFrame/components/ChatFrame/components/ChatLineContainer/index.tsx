import { useEffect, useRef, useState } from 'react'
import ChatLine from '../ChatLine'
import { RootContainer } from './styled'
import { ChatLineContainerProps } from './types'

export default function ChatLineContainer(props: ChatLineContainerProps) { 
  const { Chat,Loader } = props
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)


  const handleScroll = (e: React.UIEvent<HTMLDivElement> ) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const isAtTop = ( (scrollHeight + scrollTop) - clientHeight < 2)
    console.log(clientHeight, scrollHeight , scrollTop)
    if ( isAtTop ) {
      Loader()
      // Perform any action needed when the scroll bar is at the top
    }
  }
 
  
  return (
    <RootContainer ref={scrollRef} onScroll={handleScroll}>
      {Chat &&
        Chat.map((item, index) => {
          return <ChatLine sender={item.sender} time={item.time} message={item.message} />
        })}
    </RootContainer>
  )
}
