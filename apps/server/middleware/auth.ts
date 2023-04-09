import { Server, Socket } from 'socket.io'
import { handleVerify } from '../controllers/auth'

export const protectedRoute = async (io: Server, socket: Socket, token: string) => {
  try {
    if (!(await handleVerify(io, socket, token)).isSuccess) {
      throw new Error('verify failed')
    }
  } catch (error) {
    throw new Error('verify failed')
  }
}
