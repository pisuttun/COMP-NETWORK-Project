import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import { ClientInfoDto, ClientStatus, UpdateClientInfoDto } from '@chatAIP/dtos'
import { convertSocketIdToUserId } from '../database/utils/utils'

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
  return result
}

export const handleUpdateClientInfo = async (
  io: Server,
  socket: Socket,
  body: UpdateClientInfoDto,
) => {
  console.log('update client info')
  let { senderId, status, nickname } = body
  try {
    const userId = String(await convertSocketIdToUserId(socket.id))
    if (!senderId) {
      senderId = userId
    } else {
      if (senderId !== userId) {
        throw new Error('senderId is not match')
      }
    }
    const client = await clientModel.findByIdAndUpdate(
      senderId,
      {
        isInvisibility: status === ClientStatus.OFFLINE ? true : false,
        nickname,
      },
      { new: true },
    )
    if (!client) {
      throw new Error('client not found')
    }
    const result: ClientInfoDto = {
      userId: String(client._id),
      status: client.isInvisibility ? ClientStatus.OFFLINE : client.status,
      nickname: client.nickname,
    }
    io.emit('client info update', result)
    return result
  } catch (error) {
    console.log('error in update client info: ', error)
    return null
  }
}
