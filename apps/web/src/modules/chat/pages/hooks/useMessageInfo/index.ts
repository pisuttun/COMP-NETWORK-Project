/* eslint-disable react-hooks/exhaustive-deps */
import { useSocket } from 'common/context/socketContext'
import { useCallback, useEffect, useRef, useState } from 'react'
import { NewMessageDto, SendMessageDto } from '@chatAIP/dtos'
import { useMessageInfoParams } from './types'
import { useSnackbar } from 'common/context/SnackbarContext'
import { apiClient } from 'common/utils/api'
//@ts-ignore
import emojiName from 'emoji-name-map'

const useMessageInfo = (params: useMessageInfoParams) => {
  const { focus, isDM } = params
  const { displaySnackbar } = useSnackbar()

  const { socket } = useSocket()
  const [messageList, setMessageList] = useState<NewMessageDto[]>([])
  const nextMessage = useRef('')
  const [text, setText] = useState('')
  const [myId, setMyId] = useState('')
  const isLoading = useRef(false)

  const getGroupmessage = async (groupId: string) => {
    socket.on(groupId + ' message', (data) => {
      if (groupId === focus) {
        setMessageList((prev) => [data, ...(prev || [])])
      }
    })
  }

  const insertEmoji = useCallback(
    (text: string): string => {
      const matches = text.match(/:[a-z_]+:/g)
      if (matches) {
        matches.forEach((item) => {
          const emoji = emojiName.get(item)
          if (emoji) {
            text = text.replace(item, emoji)
          }
        })
      }
      return text
    },
    [emojiName],
  )

  const sendMessage = useCallback(() => {
    const newText = insertEmoji(text)
    const body: SendMessageDto = {
      text: newText,
      senderId: myId!,
      ...(isDM ? { receiverId: focus } : { groupId: focus }),
    }
    socket.emit('send message', body)
    const newMessage: NewMessageDto = {
      messageId: focus + messageList.length,
      text: newText,
      senderId: myId!,
      senderNickname: localStorage.getItem('name')!,
      createdAt: new Date(),
    }
    if (isDM) {
      setMessageList((prev) => [newMessage, ...(prev || [])])
    }
  }, [focus, myId, socket, text, insertEmoji])

  const getMessage = useCallback(async () => {
    if (!isLoading.current && nextMessage.current != '-' && focus != '' && myId != '') {
      isLoading.current = true
      try {
        const res = (
          await apiClient.get(`/api/messages`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
              latestMessageId: nextMessage.current,
              sourceId: myId,
              ...(isDM ? { destinationId: focus } : { groupId: focus }),
            },
          })
        ).data.data
        if (res.nextMessageId === '') {
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
  }, [focus, myId])

  useEffect(() => {
    if (isDM) {
      socket.off('new message')
      socket.on('new message', (data: NewMessageDto) => {
        displaySnackbar(`New message from ${data.senderNickname}`, 'info')
        if (data.senderId === focus) {
          setMessageList((prev) => [data, ...(prev || [])])
        }
      })
    } else {
      getGroupmessage(focus)
    }
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
