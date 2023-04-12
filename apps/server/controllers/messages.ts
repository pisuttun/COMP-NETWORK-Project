import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import chatData from '../database/model/chatData'
import {
  SendMessageDto,
  NewMessageDto,
  MessageDto,
  ResGetMessageDto,
  ReqGetMessageDto,
} from '@chatAIP/dtos'
import { Schema } from 'mongoose'

//TODO: add dto
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
      console.log('receive: ', body)
      const socketIdObject = (await clientModel.findById(receiverId).select('socketId')) || {
        socketId: '',
      }
      const socketId = socketIdObject.socketId

      console.log('socketId: ', socketId)
      io.to(socketId).emit('new message', {
        ...result,
      })
    }
    // send to group
    if (groupId) {
      console.log('receive: ', body)
      // TODO: or change to socket.join(groupId) instead? , socket.on(groupId + ' message") is kinda weird
      io.emit(groupId + ' message', {
        ...result,
      })
    }
  } catch (error) {
    console.log('error: ', error)
    return null
  }
}

export const handleGetAllMessage = async (req: any, res: any) => {
  console.log('get all chat data')
  console.log('req : ', req.body)
  const reqBody: ReqGetMessageDto = req.body
  const { latestMessageId, senderId, receiverId, groupId } = reqBody

  let chatDataQuery: any = {}
  if (latestMessageId) {
    chatDataQuery = { _id: { $lte: latestMessageId } }
  }
  if (senderId) {
    chatDataQuery = {
      ...chatDataQuery,
      senderId: senderId,
    }
  }
  let chatDataList: any[] = []
  if (receiverId) {
    chatDataList = await chatData
      .find({ ...chatDataQuery, receiverId: receiverId })
      .select('text senderId createdAt')
      .populate({
        path: 'senderId',
        model: 'clients',
        select: 'nickname',
      })
      .sort({
        createdAt: -1,
      })
      .limit(6)
  } else if (groupId) {
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
      .limit(6)
  }
  console.log('chatDataList: ', chatDataList)
  let nextMessageId = ''
  //if chatDataList size = 6, cut to 5 and 6 is nextMessageId
  if (chatDataList.length === 6) {
    nextMessageId = chatDataList[chatDataList.length - 1]._id
    chatDataList = chatDataList.slice(0, 5)
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
}
