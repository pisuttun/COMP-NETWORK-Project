import { ClientStatus } from '@chatAIP/dtos'
import clientModel from '../model/client'
import { Schema } from 'mongoose'

export const convertSocketIdToUserId = async (socketId: string): Promise<Schema.Types.ObjectId> => {
  const client = await clientModel.find({ socketId: socketId }).select('_id')
  return client[0]._id
}

export const convertUserIdToSocketId = async (userId: Schema.Types.ObjectId): Promise<string> => {
  const client = (await clientModel.findById(userId).select('socketId')) || { socketId: '' }
  return client.socketId
}

export const clearSocketIdAndStatus = async (): Promise<void> => {
  await clientModel.updateMany({}, { socketId: '', status: ClientStatus.OFFLINE })
}
