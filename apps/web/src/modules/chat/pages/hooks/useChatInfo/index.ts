import { useSocket } from 'common/context/socketContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ClientInfoDto, ClientStatus, CreateGroupDto, GroupInfoDto } from '@chatAIP/dtos'
import { useChatInfoParams } from './types'
import { useSnackbar } from 'common/context/SnackbarContext'

const useChatInfo = (params: useChatInfoParams) => {
  const { focus, setFocus } = params
  const [focusText, setFocusText] = useState<string>('')
  const [focusOnline, setFocusOnline] = useState<ClientStatus | undefined>(ClientStatus.OFFLINE)
  const { socket, loading } = useSocket()
  const [groupList, setGroupList] = useState<GroupInfoDto[]>()
  const { displaySnackbar } = useSnackbar()

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
        const joinedGroups = data.filter((group) => group.isJoined === true)

        if (joinedGroups.length !== 0) {
          // Set focus to the first group in the joined group list
          setFocus(joinedGroups[0].groupId)
        } else {
          // Set focus to "NF" if there are no joined groups
          setFocus('NF')
        }
      })
      socket.off('new group')
      socket.on('new group', (data) => {
        setGroupList((prev) => {
          const updatedGroupList = prev?.filter((group) => group.groupId !== data.groupId)
          return [...(updatedGroupList || []), data]
        })
      })
    } catch (err) {
      console.log(err)
    }
  }, [groupList, setFocus, socket])

  const createNewGroup = useCallback(
    async (name: string) => {
      try {
        if (name.length > 15) {
          displaySnackbar("Groupname can't be longer than 15 character", 'error')
        } else {
          const body: CreateGroupDto = {
            clientId: localStorage.getItem('ID')!,
            groupName: name,
          }
          socket.emit('create group', body)
        }
      } catch (err) {
        console.log(err)
      }
    },
    [displaySnackbar, socket],
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
      if (groupId === focus) {
        const joinedGroups = groupList!.filter(
          (group) => group.isJoined === true && group.groupId !== groupId,
        )

        if (joinedGroups.length !== 0) {
          // Set focus to the first group in the joined group list
          setFocus(joinedGroups[0].groupId)
        } else {
          // Set focus to "NF" if there are no joined groups
          setFocus('NF')
        }
      }
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
        setClientList((prev) => [...(prev || []), data])
      })

      socket.off('client info update')
      socket.on('client info update', (data: ClientInfoDto) => {
        if (data.userId == localStorage.getItem('ID')) {
          localStorage.setItem('name', data.nickname)
        }
        setClientList((prevClientList) =>
          prevClientList?.map((client) => (client.userId === data.userId ? data : client)),
        )
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
