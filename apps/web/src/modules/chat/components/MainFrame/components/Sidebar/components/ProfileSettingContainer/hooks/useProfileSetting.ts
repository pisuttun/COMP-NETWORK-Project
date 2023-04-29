/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { useSocket } from 'common/context/socketContext'
import { UpdateClientInfoDto } from '@chatAIP/dtos'
import { useSnackbar } from 'common/context/SnackbarContext'

const useProfileSetting = () => {
  const [value, setValue] = useState('')
  const [newDisplay, setNewDisplay] = useState('')
  const [myId, setMyId] = useState('')

  const { socket } = useSocket()
  const { displaySnackbar } = useSnackbar()

  const changeDisplayName = useCallback(async () => {
    if (newDisplay.length >= 15) {
      displaySnackbar("Name can't be longer than 15 character", 'error')
    } else {
      const body: UpdateClientInfoDto = {
        senderId: myId,
        nickname: newDisplay,
      }
      socket.emit('change client info', body)
    }
  }, [myId, newDisplay, socket])

  useEffect(() => {
    if (value != '') {
      localStorage.setItem('isInvisible', value === 'auto' ? 'false' : 'true')
      const body: UpdateClientInfoDto = {
        senderId: myId,
        isInvisible: value === 'auto' ? false : true,
      }
      socket.emit('change client info', body)
    }
  }, [value])

  useEffect(() => {
    setMyId(localStorage.getItem('ID')!)
    setValue(localStorage.getItem('isInvisible') === 'true' ? 'offline' : 'auto')
  }, [])

  return { value, setValue, changeDisplayName, newDisplay, setNewDisplay }
}
export default useProfileSetting
