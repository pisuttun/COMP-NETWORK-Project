import { Server, Socket } from 'socket.io'
import { handleVerify } from '../controllers/auth'

export const protectedRoute = async (io: Server, socket: Socket, token: string) => {
  try {
    const result = await handleVerify(io, socket, token)
    if (!result.isSuccess) {
      throw new Error('verify failed')
    }
    return result
  } catch (error) {
    throw new Error('verify failed')
  }
}
