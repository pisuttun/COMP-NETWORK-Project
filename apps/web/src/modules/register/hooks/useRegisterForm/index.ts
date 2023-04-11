import { useSocket } from 'common/context/socketContext'
import router from 'next/router'
import { useState } from 'react'
import { UserCredentialsDto } from '@chatAIP/dtos'

const useRegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { socket } = useSocket()

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
      socket.emit('register', body)
      socket.on('your id', (data) => {
        if (!data.isSuccess) {
          setUsernameError('This username is already taken')
        } else router.push('/')
        localStorage.setItem('token', data.token)
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

export default useRegisterForm
