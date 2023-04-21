import { useSocket } from 'common/context/socketContext'
import { useCallback, useEffect, useState } from 'react'
import { NewMessageDto, ReqGetMessageDto, ResGetMessageDto, SendMessageDto } from '@chatAIP/dtos'
import { useMessageInfoParams } from './types'
import { useSnackbar } from 'common/context/SnackbarContext'
import { apiClient } from 'common/utils/api'

const useMessageInfo = (params: useMessageInfoParams) => {
  const { focus } = params
  const { displaySnackbar } = useSnackbar()

  const { socket } = useSocket()
  const [messageList, setMessageList] = useState<NewMessageDto[]>([])
  const [nextMessage, setNextMessage] = useState('')
  const [text, setText] = useState('')
  const [myId, setMyId] = useState('')

  const getGroupmessage = async (groupId: string) => {
    socket.on(groupId + ' message', (data) => {
      setMessageList((prev) => ({
        ...(prev || []),
        ...data,
      }))
    })
  }

  const sendMessage = useCallback(() => {
    const body: SendMessageDto = {
      text: text,
      senderId: myId!,
      receiverId: focus,
    }
    socket.emit('send message', body)
  }, [focus, myId, socket, text])

  const getMessage = useCallback(async () => {
    console.log('This is my ID :', myId)
    try {
      const res = (
        await apiClient.get<ResGetMessageDto>(`/api/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            latestMessageId: nextMessage,
            senderId: focus,
            receiverId: myId,
          },
        })
      ).data
      setNextMessage(res.nextMessageId)
      const oldMessage = res.messages as NewMessageDto[]
      setMessageList((prev) => [...(prev || []), ...oldMessage])
    } catch (err) {
      console.log(err)
    }
  }, [focus, myId, nextMessage])

  useEffect(() => {
    socket.off('new message')
    socket.on('new message', (data: NewMessageDto) => {
      displaySnackbar(`New message from ${data.senderNickname}`, 'info')
      console.log(data)
      if (data.senderId === focus) {
        setMessageList((prev) => [data, ...(prev || [])])
      }
    })
  }, [displaySnackbar, focus, socket])

  useEffect(() => {
    getMessage()
  }, [focus, getMessage])
  useEffect(() => {
    setMyId(localStorage.getItem('ID')!)
  }, [])

  return { messageList, text, setText, sendMessage, getMessage }
}

export default useMessageInfo
