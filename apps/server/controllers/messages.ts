import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import chatData from '../database/model/chatData'

//TODO: add dto
export const handleSendMessage = async (io: Server, socket: Socket, body: any) => {
  let { text, senderId, receiverId, groupId } = body
  const senderClient = await clientModel.find({ socketId: socket.id })
  senderId = senderId ? senderId : senderClient[0]._id
  receiverId = receiverId ? receiverId : null
  groupId = groupId ? groupId : null

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
    console.log('socketId: ', socketId)
    io.to(socketId).emit('new message', {
      messageId: newChatData._id,
      text,
      senderId,
      senderIdNickname: senderClient[0].nickname,
      createdAt: newChatData.createdAt,
    })
  }
  //TODO: send to group
}

export const handleGetAllMessage = async (req: any, res: any) => {
  console.log('get all chat data')
  console.log('req : ', req.body)
  const { lastedMessageId, senderId, receiverId, groupId } = req.body
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
  ;(chatDataList = chatDataList.map((chatData) => {
    return {
      messageId: chatData._id,
      text: chatData.text,
      senderId: chatData.senderId._id,
      senderNickname: chatData.senderId.nickname,
      createdAt: chatData.createdAt,
    }
  })),
    //REST response
    res.status(200).json({
      status: 'success',
      data: { chatDataList, nextMessageId },
    })
}
