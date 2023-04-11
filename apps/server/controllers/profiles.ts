import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import { ClientStatus } from '../database/schema/interface'

export const handleGetAllClient = async (io: Server, socket: Socket) => {
  console.log('get all client')
  const clients = await clientModel.find()
  //TODO: add all client result Dto
  let result: any[] = []
  result = clients.map((client) => {
    return {
      userId: client._id,
      status: client.isInvisibility ? ClientStatus.OFFLINE : client.status,
      nickname: client.nickname,
    }
  })
  io.to(socket.id).emit('all client', result)
}
