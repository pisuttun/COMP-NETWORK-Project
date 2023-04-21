import { useSocket } from 'common/context/socketContext'
import { useState } from 'react'
import { ClientInfoDto, CreateGroupDto, GroupInfoDto, NewMessageDto } from '@chatAIP/dtos'

const useChatInfo = () => {
  const { socket } = useSocket()
  const [groupList, setGroupList] = useState<GroupInfoDto[]>()
  const [clientList, setClientList] = useState<ClientInfoDto[]>()
  const [messageList, setMessageList] = useState<NewMessageDto[]>()

  const getAllGroup = async () => {
    try {
      socket.emit('get all group')
      socket.on('all group', (data) => {
        setGroupList(data)
      })
      socket.on('new group', (data) => {
        setGroupList((prev) => ({
          ...(prev || []),
          ...data,
        }))
      })
    } catch (err) {
      console.log(err)
    }
  }

  const createNewGroup = async () => {
    try {
      const body: CreateGroupDto = {
        clientId: '1',
        groupName: 'test',
      }
      socket.emit('create group', body)
    } catch (err) {
      console.log(err)
    }
  }

  const leaveGroup = async () => {
    try {
      const body = {
        clientId: '1',
        groupId: '2',
      }
      socket.emit('leave group', body)
    } catch (err) {
      console.log(err)
    }
  }

  const joinGroup = async () => {
    try {
      const body = {
        clientId: '1',
        groupId: '2',
      }
      socket.emit('join group', body)
    } catch (err) {
      console.log(err)
    }
  }

  const getAllClient = async () => {
    try {
      socket.emit('get all client')
      socket.on('all client', (data) => {
        setClientList(data)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return { groupList, getAllClient, clientList }
}
export default useChatInfo
