import { useSocket } from 'common/context/socketContext'
import { useCallback, useEffect, useState } from 'react'
import { ClientInfoDto, CreateGroupDto, GroupInfoDto } from '@chatAIP/dtos'
import { useChatInfoParams } from './types'

const useChatInfo = (params: useChatInfoParams) => {
  const { focus, setFocus } = params
  const { socket } = useSocket()
  const [groupList, setGroupList] = useState<GroupInfoDto[]>()
  const [clientList, setClientList] = useState<ClientInfoDto[]>()
  const [isDM, setIsDM] = useState(true)
  const getAllGroup = useCallback(async () => {
    try {
      socket.emit('get all group')
      socket.on('all group', (data: GroupInfoDto[]) => {
        setGroupList(data)
        if (data.length !== 0) {
          setFocus(data[0].groupId)
        }
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
  }, [setFocus, socket])

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

  const getAllClient = useCallback(async () => {
    try {
      socket.emit('get all client')
      socket.on('all client', (data: ClientInfoDto[]) => {
        setClientList(data)
        if (data.length !== 0) {
          setFocus(data[0].userId)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }, [setFocus, socket])

  useEffect(() => {
    if (isDM) {
      getAllClient()
    } else {
      getAllGroup()
    }
  }, [getAllClient, getAllGroup, isDM])

  return { groupList, getAllClient, clientList, isDM, setIsDM, getAllGroup, focus }
}
export default useChatInfo
