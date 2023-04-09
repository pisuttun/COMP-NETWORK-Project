/* eslint-disable turbo/no-undeclared-env-vars */
import { Server, Socket } from 'socket.io'
import { Schema } from 'mongoose'
import clientModel from '../database/model/client'
import jwt from 'jsonwebtoken'
import { NextFunction } from 'express'
const users: string[] = []

const addOnlineUsers = (newSocketId: string) => {
  if (!users.includes(newSocketId)) {
    users.push(newSocketId)
  }
  console.log('current users: ', users)
}

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

  addOnlineUsers(socketId)
  return { isSuccess, socketId, token, nickname, userId }
}

const verifyStatus = (io: Server, socketId: string, isSuccess: boolean) => {
  io.to(socketId).emit('verify status', { isSuccess })
  return { isSuccess }
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

export const handleLogout = async (io: Server, socket: Socket) => {
  console.log('user logout: ', socket.id)
  //TODO : does backend need to clear the token?
  users.splice(users.indexOf(socket.id), 1)
  console.log('current users: ', users)
}

export const handleDisconnect = (io: Server, socket: Socket) => {
  console.log('user disconnected: ', socket.id)
  users.splice(users.indexOf(socket.id), 1)
  console.log('current users: ', users)
}

export const handleVerify = async (io: Server, socket: Socket, token: string) => {
  console.log('verify token', token)
  if (!token || token === 'null') {
    return verifyStatus(io, socket.id, false)
  }
  try {
    // Verify token
    let decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as jwt.JwtPayload

    // console.log(decoded)
    const client = await clientModel.findByIdAndUpdate(
      decoded.id,
      { socketId: socket.id },
      { new: true },
    )
    if (!client) {
      return verifyStatus(io, socket.id, false)
    }
    addOnlineUsers(socket.id)
    yourId(io, true, socket.id, token, client.nickname, String(client._id))
    return verifyStatus(io, socket.id, true)
  } catch (err) {
    console.log(err)
    return verifyStatus(io, socket.id, false)
  }
}
/*
export const protectedRoute = async (io: Server, socket: Socket, token: string) => {
  try {
    if (!(await handleVerify(io, socket, token)).isSuccess) {
      throw new Error('verify failed')
    }
  } catch (error) {
    throw new Error('verify failed')
  }
}
*/
export const handleGetAllClient = async (io: Server, socket: Socket) => {
  console.log('get all client')
  const clients = await clientModel.find()
  //TODO: add all client result Dto
  let result: any[] = []
  result = clients.map((client) => {
    return {
      userId: client._id,
      status: client.status,
      nickname: client.nickname,
    }
  })
  io.to(socket.id).emit('all client', result)
}
