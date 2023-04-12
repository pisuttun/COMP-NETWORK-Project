import { useEffect, useRef, useState } from 'react'
import ChatLine from '../ChatLine'
import { RootContainer } from './styled'
import { ChatLineContainerProps } from './types'

export default function ChatLineContainer(props: ChatLineContainerProps) { 
  const { Chat,Loader, curRow } = props
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // TODO: move to hooks file when connect with API
  const handleScroll = (e: React.UIEvent<HTMLDivElement> ) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const isAtTop = ( (scrollHeight + scrollTop) - clientHeight < 2)
    console.log(clientHeight, scrollHeight , scrollTop)
    if ( isAtTop ) {
      Loader()
    }
  }
 
  
  return (
    <RootContainer ref={scrollRef} onScroll={handleScroll} sx={{height: `calc(75vh - ${curRow*3}vh)`}}>
      {Chat &&
        Chat.map((item, index) => {
          return <ChatLine sender={item.sender} time={item.time} message={item.message} />
        })}
    </RootContainer>
  )
}
