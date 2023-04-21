import { useSocket } from 'common/context/socketContext'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { VerifyTokenDto } from '@chatAIP/dtos'

const useAuth = () => {
  const { socket } = useSocket()
  const [isVerify, setIsVerify] = useState(false)

  useEffect(() => {
    try {
      const body: VerifyTokenDto = {
        token: localStorage.getItem('token')!,
      }
      socket.emit('verify token', body)
      socket.on('verify status', (data) => {
        if (!data.isSuccess) {
          router.replace('')
        } else {
          setIsVerify(true)
        }
      })
    } catch (err) {
      console.log(err)
    }
  })

  return { isVerify }
}

export default useAuth
