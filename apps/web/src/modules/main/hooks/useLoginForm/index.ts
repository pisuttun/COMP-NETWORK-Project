import { useSnackbar } from 'common/context/SnackbarContext'
import { useSocket } from 'common/context/socketContext'
import router from 'next/router'
import { useState } from 'react'
import { UserCredentialsDto, YourIdDto } from '@chatAIP/dtos'

const useLoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { socket } = useSocket()
  const { displaySnackbar } = useSnackbar()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (username.trim() === '') {
      setUsernameError('Username is required')
    }
    if (password.trim() === '') {
      setPasswordError('Password is required')
    }
    try {
      const body: UserCredentialsDto = {
        username: username,
        password: password,
      }
      socket.emit('login', body)
      socket.on('your id', (data: YourIdDto) => {
        if (!data.isSuccess) {
          if (username !== '' && password !== '')
            displaySnackbar('Username or Password is wrong', 'error')
        } else router.push('/chat')
        localStorage.setItem('token', data.token)
        localStorage.setItem('ID', data.userId)
        localStorage.setItem('name', data.nickname)
        localStorage.setItem('isInvisible', data.isInvisible.toString())
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
    setUsernameError('')
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setPasswordError('')
  }
  return {
    username,
    password,
    usernameError,
    passwordError,
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
  }
}

export default useLoginForm
