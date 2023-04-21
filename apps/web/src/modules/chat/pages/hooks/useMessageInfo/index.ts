import { useSocket } from 'common/context/socketContext'
import { useState } from 'react'
import { NewMessageDto } from '@chatAIP/dtos'

const useMessageInfo = () => {
  const { socket } = useSocket()
  const [messageList, setMessageList] = useState<NewMessageDto[]>()

  const getGroupmessage = async (groupId: string) => {
    socket.on(groupId + ' message', (data) => {
      setMessageList((prev) => ({
        ...(prev || []),
        ...data,
      }))
    })
  }
}

export default useMessageInfo
