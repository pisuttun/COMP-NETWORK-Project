import { useSocket } from 'common/context/socketContext'
import { useCallback, useEffect, useRef, useState } from 'react'
import { NewMessageDto, ReqGetMessageDto, ResGetMessageDto, SendMessageDto } from '@chatAIP/dtos'
import { useMessageInfoParams } from './types'
import { useSnackbar } from 'common/context/SnackbarContext'
import { apiClient } from 'common/utils/api'

const useMessageInfo = (params: useMessageInfoParams) => {
  const { focus } = params
  const { displaySnackbar } = useSnackbar()

  const { socket } = useSocket()
  const [messageList, setMessageList] = useState<NewMessageDto[]>([])
  const nextMessage = useRef('')
  const [text, setText] = useState('')
  const [myId, setMyId] = useState('')
  const isLoading = useRef(false)

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
    if (myId !== focus) {
      const newMessage: NewMessageDto = {
        messageId: '',
        text: text,
        senderId: myId!,
        senderNickname: localStorage.getItem('name')!,
        createdAt: new Date(),
      }
      setMessageList((prev) => [newMessage, ...(prev || [])])
    }
  }, [focus, myId, socket, text])

  const getMessage = useCallback(async () => {
    console.log('This is my ID :', myId)
    if (!isLoading.current && nextMessage.current != '-') {
      isLoading.current = true
      try {
        const res = (
          await apiClient.get(`/api/messages`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
              latestMessageId: nextMessage.current,
              senderId: focus,
              receiverId: myId,
            },
          })
        ).data.data
        console.log('Next message condition: ', res.nextMessageId, messageList)
        if (res.nextMessageId === '' && res.messages.length !== 0) {
          nextMessage.current = '-'
        } else {
          nextMessage.current = res.nextMessageId
        }

        const oldMessage = res.messages
        console.log('Message :', oldMessage)
        setMessageList((prev) => [...(prev || []), ...(oldMessage || [])])
      } catch (err) {
        console.log(err)
      }
      isLoading.current = false
    }
  }, [focus, messageList, myId])

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
    nextMessage.current = ''
    console.log('Reset nextMessage')
    setMessageList([])
  }, [focus])

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessage()
    }
    console.log('Possible to fetch : ')
    if (messageList.length === 0) {
      console.log('Fetch : ', nextMessage.current)
      fetchMessages()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList, focus])
  useEffect(() => {
    setMyId(localStorage.getItem('ID')!)
  }, [])

  return { messageList, text, setText, sendMessage, getMessage }
}

export default useMessageInfo
