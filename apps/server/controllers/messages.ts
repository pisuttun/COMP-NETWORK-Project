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

//TODO: add dto
export const handleSendMessage = async (io: Server, socket: Socket, body: SendMessageDto) => {
  let { text, senderId, receiverId, groupId } = body
  const senderClient = await clientModel.find({ socketId: socket.id })
  senderId = senderId ? senderId : String(senderClient[0]._id)
  receiverId = receiverId ? receiverId : undefined
  groupId = groupId ? groupId : undefined

  //send to receiver
  if (receiverId) {
    console.log('receive: ', body)
    //save to database
    const newChatData = await chatData.create({
      text,
      senderId,
      receiverId,
      groupId,
    })
    const socketIdObject = (await clientModel.findById(receiverId).select('socketId')) || {
      socketId: '',
    }
    const socketId = socketIdObject.socketId
    const result: NewMessageDto = {
      messageId: String(newChatData._id),
      text,
      senderId,
      senderNickname: senderClient[0].nickname,
      createdAt: newChatData.createdAt,
    }
    console.log('socketId: ', socketId)
    io.to(socketId).emit('new message', {
      result,
    })
  }
  //TODO: send to group
}

export const handleGetAllMessage = async (req: any, res: any) => {
  console.log('get all chat data')
  console.log('req : ', req.body)
  const reqBody: ReqGetMessageDto = req.body
  const { lastedMessageId, senderId, receiverId, groupId } = reqBody
  //  const chatDataList = await chatData.aggregate([{ $match: { senderId: senderId } }])

  let chatDataQuery: any = {}
  if (lastedMessageId) {
    chatDataQuery = { _id: { $lte: lastedMessageId } }
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
