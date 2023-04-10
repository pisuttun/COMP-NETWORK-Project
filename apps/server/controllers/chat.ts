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
    io.to(socketId).emit('new message', { text, senderId, createdAt: newChatData.createdAt })
  }
  //TODO: send to group
}
