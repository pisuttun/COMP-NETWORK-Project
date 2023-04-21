import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import { ChatNameContainerProps } from './types'
import { RootContainer } from './styled'

export default function ChatNameContainer(props: ChatNameContainerProps) {
  const { groupList, chatChoice, isDM, focus, setFocus } = props
  return (
    <RootContainer>
      {isDM &&
        chatChoice?.map((item) => {
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
      {!isDM &&
        groupList?.map((item) => {
          return (
            <ChatNameDisplay
              key={item.groupId}
              isGroup={true}
              name={item.groupName}
              focus={'false'}
              setFocus={setFocus}
            />
          )
        })}
    </RootContainer>
  )
}
