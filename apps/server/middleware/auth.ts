import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import { IClient } from '../database/schema/interface'

// check that the socketId is logged in
export const protectedRoute = async (io: Server, socket: Socket): Promise<IClient> => {
  try {
    const client = await clientModel.find({ socketId: socket.id })
    // duplicate socketId, should not happen
    if (client.length > 1) {
      console.log('duplicate socketId')
      throw new Error('duplicate socketId')
    }
    // not logged in
    if (client.length === 0) {
      console.log('not logged in')
      throw new Error('authentification failed')
    }
    return client[0]
  } catch (error) {
    throw new Error('authentification failed')
  }
}
