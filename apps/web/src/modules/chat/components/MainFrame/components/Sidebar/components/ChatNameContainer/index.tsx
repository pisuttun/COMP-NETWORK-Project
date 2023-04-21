import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import { ChatNameContainerProps } from './types'
import { RootContainer } from './styled'

export default function ChatNameContainer(props: ChatNameContainerProps) {
  const { ChatChoice } = props
  return (
    <RootContainer>
      {ChatChoice?.map((item, index) => {
        return <ChatNameDisplay isGroup={false} name={item.nickname} status={item.status} />
      })}
    </RootContainer>
  )
}
