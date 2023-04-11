import router from 'next/router'
import { useCallback, useState } from 'react'

const useRegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (username.trim() === '') {
      setUsernameError('Username is required')
    }
    if (password.trim() === '') {
      setPasswordError('Password is required')
    }

    // try {
    //   const response = await fetch(`/api/users/${username}`)
    //   const isUsernameTaken = await response.json()
    //   if (isUsernameTaken) {
    //     setUsernameError('This username is already taken')
    //   } else router.push('/job')
    // } catch (error) {
    //   console.error(error)
    // } finally {
    //   // setLoading(false)
    // }
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
