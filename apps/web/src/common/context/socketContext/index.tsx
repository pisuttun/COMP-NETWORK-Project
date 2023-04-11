import React, { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import { ISocketContext } from './types'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export const useSocket = () => React.useContext(SocketContext)

export const SocketProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const URL = process.env.NEXT_PUBLIC_DROPLET_URL || 'http://localhost:8000'
  const socket = io(URL, { transports: ['websocket'], reconnection: false })
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  socket.on('connect', () => {
    if (typeof window !== 'undefined') {
      //setLoading(true)
      socket.emit('verify token', {
        token: localStorage.getItem('token') || '',
      })
    }
    socket.on('verify status', (data: { isSuccess: boolean }) => {
      console.log(data)
      if (data.isSuccess === false && router.pathname !== '/') {
        router.replace('/')
      }
      setLoading(false)
    })
  })

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
