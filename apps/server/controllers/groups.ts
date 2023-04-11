import { CreateGroupDto, GroupInfoDto } from '@chatAIP/dtos'
import { Server, Socket } from 'socket.io'
import groupModel from '../database/model/group'
import clientModel from '../database/model/client'

export const handleCreateGroup = async (io: Server, socket: Socket, body: CreateGroupDto) => {
  let { groupName, clientId } = body
  const socketId = socket.id
  try {
    const group = await groupModel.create({
      groupName,
      clientId: [clientId],
    })

    //generate result with Dto type
    const receiverResult: GroupInfoDto = {
      groupId: String(group._id),
      groupName: group.groupName,
      isJoined: false,
    }
    const creatorResult: GroupInfoDto = {
      groupId: String(group._id),
      groupName: group.groupName,
      isJoined: true,
    }

    //send to receiver (include creator)
    io.emit('new group', {
      receiverResult,
    })
    //send to creator
    io.to(socketId).emit('new group', {
      creatorResult,
    })

    return group
  } catch (error) {
    console.log('error: ', error)
    return null
  }
}
