/* eslint-disable turbo/no-undeclared-env-vars */
import { Server, Socket } from 'socket.io'
import clientModel from '../database/model/client'
import jwt from 'jsonwebtoken'
import {
  VerifyStatusDto,
  YourIdDto,
  ClientStatus,
  ClientInfoDto,
  UserCredentialsDto,
} from '@chatAIP/dtos'
const users: string[] = []

const addOnlineUsers = (newSocketId: string) => {
  if (!users.includes(newSocketId)) {
    users.push(newSocketId)
  }
  console.log('current users: ', users)
}

const yourId = (io: Server, payload: YourIdDto) => {
  const { isSuccess, socketId, token, nickname, userId, isInvisible } = payload
  //TODO : add expire time?
  io.to(socketId).emit('your id', { isSuccess, socketId, token, nickname, userId, isInvisible })

  addOnlineUsers(socketId)
  return { isSuccess, socketId, token, nickname, userId, isInvisible }
}

const verifyStatus = (io: Server, socketId: string, verifyStatusDto: VerifyStatusDto) => {
  const { isSuccess } = verifyStatusDto
  io.to(socketId).emit('verify status', { isSuccess })
  return verifyStatusDto
}

export const handleRegister = async (io: Server, socket: Socket, body: UserCredentialsDto) => {
  let socketId = socket.id
  try {
    console.log('new user registered')
    // Create user
    let newClient = await clientModel.create({
      username: body.username,
      password: body.password,
      nickname: body.username, //set nickname to username by default
      socketId: socketId,
      status: ClientStatus.OFFLINE,
    })
    const token = newClient.getSignedJwtToken()
    //emit {new client} info to all online users
    const newClientEmit: ClientInfoDto = {
      userId: String(newClient._id),
      status: newClient.status,
      nickname: newClient.nickname,
    }
    io.emit('new client', newClientEmit)

    return yourId(io, {
      isSuccess: true,
      socketId,
      token,
      nickname: newClient.nickname,
      userId: String(newClient._id),
      isInvisible: newClient.isInvisibility,
    })
  } catch (error) {
    console.log('error in register: ', error)
    return yourId(io, {
      isSuccess: false,
      socketId,
      token: '',
      nickname: '',
      userId: '',
      isInvisible: false,
    })
  }
}

export const handleLogin = async (io: Server, socket: Socket, body: UserCredentialsDto) => {
  try {
    let socketId = socket.id
    const { username, password } = body
    // Validate email & password
    if (!username || !password) {
      return yourId(io, {
        isSuccess: false,
        socketId,
        token: '',
        nickname: '',
        userId: '',
        isInvisible: false,
      })
    }
    // Check for user
    const client = await clientModel.findOne({ username }).select('+password')
    if (!client) {
      return yourId(io, {
        isSuccess: false,
        socketId,
        token: '',
        nickname: '',
        userId: '',
        isInvisible: false,
      })
    } else {
      // Check if password matches
      const isMatch = await client.matchPassword(password)
      if (!isMatch) {
        return yourId(io, {
          isSuccess: false,
          socketId,
          token: '',
          nickname: '',
          userId: '',
          isInvisible: false,
        })
      } else {
        const token = client.getSignedJwtToken()
        const updatedClient = await clientModel.findByIdAndUpdate(
          client.id,
          { socketId: socket.id, status: ClientStatus.AVAILABLE },
          { new: true },
        )
        if (!updatedClient) return ''
        //emit {client info update} to all online users, indicate the user is online (if not invisible)
        if (!updatedClient.isInvisibility) {
          const clientInfo: ClientInfoDto = {
            userId: String(updatedClient._id),
            status: updatedClient.status,
            nickname: updatedClient.nickname,
          }
          io.emit('client info update', clientInfo)
        }
        console.log('Test before yourId')
        return yourId(io, {
          isSuccess: true,
          socketId,
          token,
          nickname: updatedClient.nickname,
          userId: String(updatedClient._id),
          isInvisible: updatedClient.isInvisibility,
        })
      }
    }
  } catch (error) {
    console.log('error in login: ', error)
  }
}

export const handleLogout = async (io: Server, socket: Socket, userId: string) => {
  console.log('user logout: ', socket.id)

  const client = await clientModel.findByIdAndUpdate(
    userId,
    { socketId: '', status: ClientStatus.OFFLINE },
    { new: true },
  )
  users.splice(users.indexOf(socket.id), 1)
  console.log('current users: ', users)
  //emit {client info update} to all online users, indicate the user is logout (if not invisible)
  if (client && !client.isInvisibility) {
    const clientInfo: ClientInfoDto = {
      userId: String(client._id),
      status: client.status,
      nickname: client.nickname,
    }
    io.emit('client info update', clientInfo)
  }
  return true
}

export const handleDisconnect = async (io: Server, socket: Socket) => {
  console.log('user disconnected: ', socket.id)

  //clear socketId in db
  const client = await clientModel.find({ socketId: socket.id })
  //use for to ensure all socketId are cleared
  for (let i = 0; i < client.length; i++) {
    await clientModel.findByIdAndUpdate(
      client[i].id,
      { socketId: '', status: ClientStatus.OFFLINE },
      { new: true },
    )
  }

  users.splice(users.indexOf(socket.id), 1)
  console.log('current users: ', users)
}

export const handleVerify = async (io: Server, socket: Socket, token: string) => {
  console.log('verify token', token)
  if (!token || token === 'null') {
    return { isSuccess: verifyStatus(io, socket.id, { isSuccess: false }).isSuccess, userId: '' }
  }
  try {
    // Verify token
    let decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as jwt.JwtPayload

    const client = await clientModel.findByIdAndUpdate(
      decoded.id,
      { socketId: socket.id, status: ClientStatus.AVAILABLE },
      { new: true },
    )
    if (!client) {
      return { isSuccess: verifyStatus(io, socket.id, { isSuccess: false }).isSuccess, userId: '' }
    }
    addOnlineUsers(socket.id)
    yourId(io, {
      isSuccess: true,
      socketId: socket.id,
      token,
      nickname: client.nickname,
      userId: String(client._id),
      isInvisible: client.isInvisibility,
    })

    //emit {client info update} to all online users, indicate the user is online (if not invisible)
    if (client && !client.isInvisibility) {
      const clientInfo: ClientInfoDto = {
        userId: String(client._id),
        status: client.status,
        nickname: client.nickname,
      }
      io.emit('client info update', clientInfo)
    }
    return {
      isSuccess: verifyStatus(io, socket.id, { isSuccess: true }).isSuccess,
      userId: decoded.id,
    }
  } catch (err) {
    console.log(err)
    return { isSuccess: verifyStatus(io, socket.id, { isSuccess: false }).isSuccess, userId: '' }
  }
}
