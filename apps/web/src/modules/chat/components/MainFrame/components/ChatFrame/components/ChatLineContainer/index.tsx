import ChatLine from '../ChatLine'
import { RootContainer } from './styled'
import { ChatLineContainerProps } from './types'

export default function ChatLineContainer(props: ChatLineContainerProps) {
  const { Chat } = props
  return (
    <RootContainer>
      {Chat &&
        Chat.map((item, index) => {
          return <ChatLine sender={item.sender} time={item.time} message={item.message} />
        })}
    </RootContainer>
  )
}
