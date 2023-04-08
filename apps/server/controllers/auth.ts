import { Server, Socket } from 'socket.io'
import { Schema } from 'mongoose'
import clientModel from '../database/model/client'
const users: string[] = []

//TODO: add yourId Dto and change the body type
const yourId = (
  io: Server,
  isSuccess: boolean,
  socketId: string,
  token: string,
  nickname: string,
  userId: string,
) => {
  //TODO : add expire time?
  io.to(socketId).emit('your id', { isSuccess, socketId, token, nickname, userId })

  //not push the socketId if it is already in the array
  if (!users.includes(socketId)) {
    users.push(socketId)
  }
  console.log('current users: ', users)
  return { isSuccess, socketId, token, nickname, userId }
}
//TODO: add register Dto and change the body type
export const handleRegister = async (io: Server, socket: Socket, body: any) => {
  let socketId = socket.id
  try {
    console.log('new user registered')
    // Create user
    let newClient = await clientModel.create({
      username: body.username,
      password: body.password,
      nickname: body.username, //set nickname to username by default
      socketId: socketId,
    })
    const token = newClient.getSignedJwtToken()
    return yourId(io, true, socketId, token, newClient.nickname, String(newClient._id))
  } catch (error) {
    console.log('error in register: ', error)
    return yourId(io, false, socketId, '', '', '')
  }
}

export const handleLogin = async (io: Server, socket: Socket, body: any) => {
  try {
    let socketId = socket.id
    const { username, password } = body
    // Validate email & password
    if (!username || !password) {
      return yourId(io, false, socketId, '', '', '')
    }
    // Check for user
    const client = await clientModel.findOne({ username }).select('+password')
    if (!client) {
      return yourId(io, false, socketId, '', '', '')
    } else {
      // Check if password matches
      const isMatch = await client.matchPassword(password)
      if (!isMatch) {
        return yourId(io, false, socketId, '', '', '')
      } else {
        const token = client.getSignedJwtToken()
        return yourId(io, true, socketId, token, client.nickname, String(client._id))
      }
    }
  } catch (error) {
    console.log('error in login: ', error)
  }
}

export const handleDisconnect = (io: Server, socket: Socket) => {
  console.log('user disconnected: ', socket.id)
  users.splice(users.indexOf(socket.id), 1)
  console.log('current users: ', users)
}
