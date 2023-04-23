/* eslint-disable react-hooks/exhaustive-deps */
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
        messageId: focus + messageList.length,
        text: text,
        senderId: myId!,
        senderNickname: localStorage.getItem('name')!,
        createdAt: new Date(),
      }
      setMessageList((prev) => [newMessage, ...(prev || [])])
    }
  }, [focus, myId, socket, text])

  const getMessage = useCallback(async () => {
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
              sourceId: focus,
              destinationId: myId,
            },
          })
        ).data.data
        if (res.nextMessageId === '' && (!res.messages || res.messages.length !== 0)) {
          nextMessage.current = '-'
        } else {
          nextMessage.current = res.nextMessageId
        }
        if (res.messages.length !== 0) {
          const oldMessage = res.messages
          setMessageList((prev) => [...(prev || []), ...(oldMessage || [])])
        }
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
      console.log('Add message condition senderId:', data.senderId)
      console.log('Add message condition focus:', focus)
      if (data.senderId === focus) {
        setMessageList((prev) => [data, ...(prev || [])])
      }
    })
  }, [focus])

  useEffect(() => {
    nextMessage.current = ''
    setMessageList([])
  }, [focus])

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessage()
    }
    if (messageList.length === 0) {
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
