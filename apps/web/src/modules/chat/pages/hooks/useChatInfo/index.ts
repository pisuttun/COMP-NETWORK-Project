import { useSocket } from 'common/context/socketContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ClientInfoDto, ClientStatus, CreateGroupDto, GroupInfoDto } from '@chatAIP/dtos'
import { useChatInfoParams } from './types'

const useChatInfo = (params: useChatInfoParams) => {
  const { focus, setFocus } = params
  const [focusText, setFocusText] = useState<string>('')
  const [focusOnline, setFocusOnline] = useState<ClientStatus | undefined>(ClientStatus.OFFLINE)
  const { socket, loading } = useSocket()
  const [groupList, setGroupList] = useState<GroupInfoDto[]>()

  const joinedGroupList = useMemo(
    () => groupList?.filter((group) => group.isJoined === true),
    [groupList],
  )

  const unjoinGroupList = useMemo(
    () => groupList?.filter((group) => group.isJoined === false),
    [groupList],
  )

  const [clientList, setClientList] = useState<ClientInfoDto[]>()
  const [isDM, setIsDM] = useState(true)
  const getAllGroup = useCallback(async () => {
    try {
      socket.emit('get all group')
      socket.off('all group')
      socket.on('all group', (data: GroupInfoDto[]) => {
        setGroupList(data)
        if (data.length !== 0) {
          setFocus(data[0].groupId)
        }
      })
      socket.off('new group')
      socket.on('new group', (data) => {
        const updatedGroupList = groupList?.filter((group) => group.groupId !== data.groupId)
        setGroupList([...(updatedGroupList || []), data])
      })
    } catch (err) {
      console.log(err)
    }
  }, [groupList, setFocus, socket])

  const createNewGroup = useCallback(
    async (name: string) => {
      try {
        const body: CreateGroupDto = {
          clientId: localStorage.getItem('ID')!,
          groupName: name,
        }
        socket.emit('create group', body)
      } catch (err) {
        console.log(err)
      }
    },
    [socket],
  )

  const leaveGroup = async (groupId: string) => {
    try {
      const body = {
        clientId: localStorage.getItem('ID'),
        groupId: groupId,
      }
      socket.emit('leave group', body)
      setGroupList((prevGroupList) =>
        prevGroupList?.map((group) =>
          group.groupId === groupId ? { ...group, isJoined: false } : group,
        ),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const joinGroup = async (groupId: string) => {
    try {
      const body = {
        clientId: localStorage.getItem('ID'),
        groupId: groupId,
      }
      socket.emit('join group', body)
      setGroupList((prevGroupList) =>
        prevGroupList?.map((group) =>
          group.groupId === groupId ? { ...group, isJoined: true } : group,
        ),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const getAllClient = useCallback(async () => {
    try {
      socket.emit('get all client')
      socket.off('all client')
      socket.on('all client', (data: ClientInfoDto[]) => {
        setClientList(data)
        if (data.length !== 0) {
          setFocus(data[0].userId)
        }
      })
      socket.off('new client')
      socket.on('new client', (data) => {
        setClientList([...(clientList || []), data])
      })
    } catch (err) {
      console.log(err)
    }
  }, [clientList, setFocus, socket])

  useEffect(() => {
    if (!loading) {
      if (isDM) {
        getAllClient()
      } else {
        getAllGroup()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDM, loading])

  useEffect(() => {
    if (isDM) {
      try {
        const focusedClient: ClientInfoDto | undefined = clientList!.find(
          (client) => client.userId === focus,
        )
        setFocusText(focusedClient?.nickname!)
        setFocusOnline(focusedClient?.status)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const focusedGroup: GroupInfoDto | undefined = groupList!.find(
          (client) => client.groupId === focus,
        )
        setFocusText(focusedGroup?.groupName!)
        setFocusOnline(undefined)
      } catch (err) {
        console.log(err)
      }
    }
  }, [clientList, focus, groupList, isDM])

  return {
    joinedGroupList,
    unjoinGroupList,
    clientList,
    isDM,
    setIsDM,
    focusText,
    focusOnline,
    createNewGroup,
    joinGroup,
    leaveGroup,
  }
}
export default useChatInfo
