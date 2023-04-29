import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import { ChatNameContainerProps } from './types'
import { RootContainer } from './styled'

export default function ChatNameContainer(props: ChatNameContainerProps) {
  const { chatChoice, focus, setFocus, isSetting } = props
  return (
    <RootContainer sx={{ height: isSetting ? 'calc(85vh - 240px)' : '85vh' }}>
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
