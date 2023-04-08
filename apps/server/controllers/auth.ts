import { Server, Socket } from 'socket.io'
import { Schema } from 'mongoose'
import clientModel from '../database/model/client'
const users: string[] = []

//TODO: add yourId Dto and change the body type
const yourId = (
  io: Server,
  socketId: string,
  token: string,
  nickname: string,
  userId: Schema.Types.ObjectId,
) => {
  //TODO : add expire time?
  io.to(socketId).emit('your id', { socketId, token, nickname, userId })
  users.push(socketId)
  console.log('current users: ', users)
}
//TODO: add register Dto and change the body type
export const handleRegister = async (io: Server, socket: Socket, body: any) => {
  let socketId = socket.id
  console.log('new user registered')
  // Create user
  let newClient = await clientModel.create({
    username: body.username,
    password: body.password,
    nickname: body.username, //set nickname to username by default
    socketId: socketId,
  })
  const token = newClient.getSignedJwtToken()
  yourId(io, socketId, token, newClient.nickname, newClient._id)
}

export const handleLogin = (io: Server, socket: Socket) => {
  let id = socket.id
  console.log('new user connected')
  io.to(id).emit('your id', socket.id)
  users.push(id)
  console.log('current users: ', users)
}

export const handleDisconnect = (io: Server, socket: Socket) => {
  console.log('user disconnected: ', socket.id)
  users.splice(users.indexOf(socket.id), 1)
  console.log('current users: ', users)
}
