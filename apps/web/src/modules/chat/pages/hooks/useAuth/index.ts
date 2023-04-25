import { useSocket } from 'common/context/socketContext'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { VerifyTokenDto } from '@chatAIP/dtos'

const useAuth = () => {
  const { socket } = useSocket()
  const [isVerify, setIsVerify] = useState(false)

  const logout = () => {
    try {
      socket.emit('logout')
      localStorage.clear()
      router.replace('/')
    } catch (err) {
      console.log(err)
    }
  }

  return { logout }
}

export default useAuth
