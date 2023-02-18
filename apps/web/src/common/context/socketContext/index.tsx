import React, { createContext } from 'react'
import { io } from 'socket.io-client'
import { ISocketContext } from './types'

const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export const useSocket = () => React.useContext(SocketContext)

export const SocketProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const URL = process.env.NEXT_PUBLIC_DROPLET_URL || 'http://localhost:8000'
  const socket = io(URL, { transports: ['websocket'], reconnection: false })

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
