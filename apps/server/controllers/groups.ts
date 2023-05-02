import { CreateGroupDto, GroupClientIdDto, GroupInfoDto } from '@chatAIP/dtos'
import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import groupModel from '../database/model/group'
import { convertSocketIdToUserId } from '../database/utils/utils'
import { Schema } from 'mongoose'

export const handleCreateGroup = async (io: Server, socket: Socket, body: CreateGroupDto) => {
  try {
    let { groupName, clientId } = body
    //validate
    const userId = String(await convertSocketIdToUserId(socket.id))
    clientId = clientId ? clientId : userId
    if (clientId !== userId) throw new Error('clientId is not match with userId')
    if (groupName.length > 15) throw new Error('groupName too long')
    const socketId = socket.id
    const group = await groupModel.create({
      groupName,
      clientId: [clientId],
    })
    const client = await clientModel.findByIdAndUpdate(
      clientId,
      {
        $addToSet: { groupId: group._id },
      },
      { new: true },
    )
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
    io.emit('new group', receiverResult)
    //send to creator
    io.to(socketId).emit('new group', creatorResult)

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
    io.to(socket.id).emit('all group', result)
    return groups
  } catch (error) {
    console.log('error: ', error)
    return null
  }
}

export const handleJoinGroup = async (io: Server, socket: Socket, body: GroupClientIdDto) => {
  try {
    let { groupId, clientId } = body
    //validate
    const userId = String(await convertSocketIdToUserId(socket.id))
    clientId = clientId ? clientId : userId
    if (clientId !== userId) throw new Error('clientId is not match with userId')

    const group = await groupModel.findByIdAndUpdate(
      groupId,
      {
        $addToSet: { clientId },
      },
      { new: true },
    )
    const client = await clientModel.findByIdAndUpdate(
      clientId,
      {
        $addToSet: { groupId },
      },
      { new: true },
    )
    return group
  } catch (error) {
    console.log('error: ', error)
    return null
  }
}

export const handleLeaveGroup = async (io: Server, socket: Socket, body: GroupClientIdDto) => {
  try {
    let { groupId, clientId } = body
    //validate
    const client = await clientModel.findOne({ socketId: socket.id })
    if (!client) throw new Error('client not found')
    clientId = clientId ? clientId : String(client._id)
    let clientInGroup = false
    client.groupId.forEach((eachGroupId) => {
      if (String(eachGroupId) === groupId) {
        clientInGroup = true
      }
    })
    if (!clientInGroup) throw new Error('client is not in this group')

    if (clientId !== String(client._id)) throw new Error('clientId is not match with userId')

    const group = await groupModel.findByIdAndUpdate(
      groupId,
      {
        $pull: { clientId },
      },
      { new: true },
    )
    const clientUpdated = await clientModel.findByIdAndUpdate(
      clientId,
      {
        $pull: { groupId },
      },
      { new: true },
    )
    return group
  } catch (error) {
    console.log('error: ', error)
    return null
  }
}
