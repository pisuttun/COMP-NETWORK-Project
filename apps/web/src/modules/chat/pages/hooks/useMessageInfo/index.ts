import { useSocket } from 'common/context/socketContext'
import { useCallback, useEffect, useState } from 'react'
import { NewMessageDto, SendMessageDto } from '@chatAIP/dtos'
import { useMessageInfoParams } from './types'
import { useSnackbar } from 'common/context/SnackbarContext'

const useMessageInfo = (params: useMessageInfoParams) => {
  const { focus } = params
  const { displaySnackbar } = useSnackbar()

  const { socket } = useSocket()
  const [messageList, setMessageList] = useState<NewMessageDto[]>()
  const [text, setText] = useState('')

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
      senderId: localStorage.getItem('ID')!,
      receiverId: focus,
    }
    socket.emit('send message', body)
  }, [focus, socket, text])

  useEffect(() => {
    socket.on('new message', (data: NewMessageDto) => {
      displaySnackbar(`New message from ${data.senderNickname}`, 'info')
    })
  })

  return { messageList, text, setText, sendMessage }
}

export default useMessageInfo
