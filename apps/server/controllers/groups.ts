import { CreateGroupDto, GroupInfoDto } from '@chatAIP/dtos'
import { Server, Socket } from 'socket.io'
import groupModel from '../database/model/group'
import { convertSocketIdToUserId } from '../database/utils/utils'

export const handleCreateGroup = async (io: Server, socket: Socket, body: CreateGroupDto) => {
  try {
    let { groupName, clientId } = body
    const userId = String(await convertSocketIdToUserId(socket.id))
    clientId = clientId ? clientId : userId
    if (clientId !== userId) throw new Error('clientId is not match with userId')

    const socketId = socket.id
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

export const handleGetAllGroup = async (io: Server, socket: Socket) => {
  try {
    const groups = await groupModel.find()
    const cliendId = await convertSocketIdToUserId(socket.id)
    const result: GroupInfoDto[] = []
    groups.forEach((group) => {
      const groupInfo: GroupInfoDto = {
        groupId: String(group._id),
        groupName: group.groupName,
        isJoined: group.clientId.includes(cliendId),
      }
      result.push(groupInfo)
    })
    io.to(socket.id).emit('all group', {
      result,
    })
    return groups
  } catch (error) {
    console.log('error: ', error)
    return null
  }
}
