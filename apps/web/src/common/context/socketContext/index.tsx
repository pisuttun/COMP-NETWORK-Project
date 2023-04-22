import React, { createContext, useEffect } from 'react'
import { ISocketContext, ISocketProvider } from './types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import { VerifyStatusDto, VerifyTokenDto } from '@chatAIP/dtos'

const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export const useSocket = () => React.useContext(SocketContext)

export const SocketProvider = ({ children, socket }: ISocketProvider) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (typeof window !== 'undefined') {
      const body: VerifyTokenDto = {
        token: localStorage.getItem('token') || '',
      }
      socket.emit('verify token', body)
    }
  }, [])

  socket.on('connect', () => {})

  socket.on('verify status', (data: VerifyStatusDto) => {
    setLoading(false)
    if (data.isSuccess === false && router.pathname === '/chat') {
      router.replace('/')
    }
  })

  return (
    <SocketContext.Provider value={{ socket, loading }}>
      {children}
      {loading && (
        <CircularProgress sx={{ position: 'fixed', zIndex: 99, top: '50%', left: '50%' }} />
      )}
    </SocketContext.Provider>
  )
}
