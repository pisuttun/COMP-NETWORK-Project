import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import { ChatNameContainerProps } from './types'
import { RootContainer } from './styled'

export default function ChatNameContainer(props: ChatNameContainerProps) {
  const { chatChoice, focus, setFocus } = props
  return (
    <RootContainer>
      {chatChoice?.map((item) => {
        return (
          <ChatNameDisplay
            key={item.userId}
            isGroup={false}
            name={item.nickname}
            status={item.status}
            focus={focus}
            setFocus={setFocus}
            id={item.userId}
          />
        )
      })}
    </RootContainer>
  )
}
