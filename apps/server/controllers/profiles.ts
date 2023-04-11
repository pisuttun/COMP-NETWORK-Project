import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import { ClientInfoDto, ClientStatus } from '@chatAIP/dtos'

export const handleGetAllClient = async (io: Server, socket: Socket) => {
  console.log('get all client')
  const clients = await clientModel.find()

  let result: ClientInfoDto[] = []
  result = clients.map((client) => {
    return {
      userId: String(client._id),
      status: client.isInvisibility ? ClientStatus.OFFLINE : client.status,
      nickname: client.nickname,
    }
  })
  io.to(socket.id).emit('all client', result)
}
