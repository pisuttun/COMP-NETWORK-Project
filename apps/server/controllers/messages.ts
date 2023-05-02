/* eslint-disable turbo/no-undeclared-env-vars */
import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import chatData from '../database/model/chatData'
import groupModel from '../database/model/group'
import { Request, Response } from 'express'
import {
  SendMessageDto,
  NewMessageDto,
  MessageDto,
  ResGetMessageDto,
  ReqGetMessageDto,
} from '@chatAIP/dtos'

export const handleSendMessage = async (io: Server, socket: Socket, body: SendMessageDto) => {
  try {
    let { text, senderId, receiverId, groupId } = body
    let senderClient = (await clientModel.find({ socketId: socket.id }))[0]
    if (!senderClient) throw new Error('client not found')

    senderId = senderId ? senderId : String(senderClient._id)
    receiverId = receiverId ? receiverId : undefined
    groupId = groupId ? groupId : undefined

    if (groupId) {
      let clientInGroup = false
      senderClient.groupId.forEach((eachGroupId) => {
        if (String(eachGroupId) === groupId) {
          clientInGroup = true
        }
      })
      if (!clientInGroup) throw new Error('client is not in this group')
    }
    //save to database
    const newChatData = await chatData.create({
      text,
      senderId,
      receiverId,
      groupId,
    })
    //generate result with Dto type
    const result: NewMessageDto = {
      messageId: String(newChatData._id),
      text,
      senderId,
      senderNickname: senderClient.nickname,
      createdAt: newChatData.createdAt,
    }
    // send to receiver
    if (receiverId) {
      if (receiverId === senderId)
        throw new Error('senderId and receiverId is the same, message send to self but not notifed')
      console.log('receive: ', body)
      const socketIdObject = (await clientModel.findById(receiverId).select('socketId')) || {
        socketId: '',
      }
      const socketId = socketIdObject.socketId

      console.log('socketId: ', socketId)
      io.to(socketId).emit('new message', result)
    }
    // send to group
    if (groupId) {
      console.log('receive: ', body)
      // TODO: or change to socket.join(groupId) instead? , socket.on(groupId + ' message") is kinda weird
      io.emit(groupId + ' message', result)
    }
  } catch (error) {
    console.log('error: ', error)
    return null
  }
}

export const handleGetAllMessage = async (req: Request, res: Response) => {
  console.log('get all chat data')
  try {
    console.log('req : ', req.query)
    const reqParams: ReqGetMessageDto = req.query
    const { latestMessageId, destinationId, sourceId, groupId } = reqParams
    const senderId = req.user!._id
    console.log('test senderId :', senderId)

    const fixedNumberOfMessage = 10

    let chatDataQuery = {}
    if (latestMessageId) {
      chatDataQuery = { _id: { $lte: latestMessageId } }
    }

    let chatDataList: any[] = []
    if (sourceId && destinationId) {
      // Not owner
      if (String(senderId) !== sourceId) {
        res.status(401).json({
          message: 'sourceId and senderId not match',
        })
        return
      }
      chatDataList = await chatData
        .find({
          $or: [
            {
              $and: [{ senderId: destinationId, receiverId: sourceId }, { ...chatDataQuery }],
            },
            {
              $and: [{ senderId: sourceId, receiverId: destinationId }, { ...chatDataQuery }],
            },
          ],
        })
        .select('text senderId createdAt')
        .populate({
          path: 'senderId',
          model: 'clients',
          select: 'nickname',
        })
        .sort({
          createdAt: -1,
        })
        .limit(fixedNumberOfMessage + 1)
    } else if (groupId) {
      const group = await groupModel.findById(groupId)
      if (!group) {
        res.status(404).json({
          message: 'group not found',
        })
        return
      }
      // Not in group
      console.log('test query group: ', group)

      if (!group.clientId.includes(senderId)) {
        res.status(401).json({
          message: 'senderId not in group',
        })
        return
      }
      chatDataList = await chatData
        .find({ ...chatDataQuery, groupId: groupId })
        .select('text senderId createdAt')
        .populate({
          path: 'senderId',
          model: 'clients',
          select: 'nickname',
        })
        .sort({
          createdAt: -1,
        })
        .limit(fixedNumberOfMessage + 1)
    }
    console.log('chatDataList: ', chatDataList)
    let nextMessageId = ''
    //if chatDataList size = fixedNumberOfMessage + 1, cut to fixedNumberOfMessage and the last one is nextMessageId
    if (chatDataList.length === fixedNumberOfMessage + 1) {
      nextMessageId = chatDataList[chatDataList.length - 1]._id
      chatDataList = chatDataList.slice(0, fixedNumberOfMessage)
    }
    const messages: MessageDto[] = chatDataList.map((chatData) => {
      return {
        messageId: chatData._id,
        text: chatData.text,
        senderId: chatData.senderId._id,
        senderNickname: chatData.senderId.nickname,
        createdAt: chatData.createdAt,
      }
    })
    const result: ResGetMessageDto = { messages, nextMessageId }
    //REST response
    res.status(200).json({
      status: 'success',
      data: result,
    })
  } catch (error) {
    console.log('error in get messages: ', error)
    res.status(500).json({
      message: error,
    })
  }
}
