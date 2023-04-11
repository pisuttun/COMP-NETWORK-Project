import React, { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import { ISocketContext } from './types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import { VerifyStatusDto, VerifyTokenDto } from '@chatAIP/dtos'

const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export const useSocket = () => React.useContext(SocketContext)

export const SocketProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const URL = process.env.NEXT_PUBLIC_DROPLET_URL || 'http://localhost:8000'
  const socket = io(URL, { transports: ['websocket'], reconnection: false })
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
    <SocketContext.Provider value={{ socket }}>
      {children}
      {loading && (
        <CircularProgress sx={{ position: 'fixed', zIndex: 99, top: '50%', left: '50%' }} />
      )}
    </SocketContext.Provider>
  )
}
