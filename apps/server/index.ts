/* eslint-disable turbo/no-undeclared-env-vars */
import express from 'express'
import https from 'https'
import http from 'http'
import { Server, Socket } from 'socket.io'
import fs from 'fs'
import cors from 'cors'
import dotenv from 'dotenv'

import { Types } from 'mongoose'
import connectDatabase from './database/dbConnect'
import clientModel from './database/model/client'
import chatDataModel from './database/model/chatData'
import groupModel from './database/model/group'
import { ClientStatus } from './database/schema/interface'
import {
  handleDisconnect,
  handleLogin,
  handleRegister,
  handleVerify,
  handleLogout,
  handleGetAllClient,
} from './controllers/auth'
import { protectedRoute } from './middleware/auth'
const SocketIO = require('socket.io')

var io: Server
var server: https.Server | http.Server
dotenv.config()
const app = express()
app.use(cors())

//connect to database
try {
  connectDatabase()
} catch (error) {
  console.log('error connecting to database: ', error)
}

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync(process.env.HTTPS_SERVER_KEY_PATH || ''),
    cert: fs.readFileSync(process.env.HTTPS_SERVER_CERT_PATH || ''),
  }
  server = https.createServer(options, app)
  io = SocketIO(server, {
    secure: true,
  })
} else {
  server = http.createServer(app)
  io = new Server(server)
}

const users: string[] = []
io.on('connection', (socket: Socket) => {
  console.log('new socket connection: ', socket.id)
  //verify the token
  socket.on('verify token', (body: any) => {
    const token = body.token
    handleVerify(io, socket, token)
  })

  //auth routes
  socket.on('register', (body: any) => {
    handleRegister(io, socket, body)
  })
  socket.on('login', (body: any) => {
    handleLogin(io, socket, body)
  })
  socket.on('disconnect', () => {
    handleDisconnect(io, socket)
  })
  socket.on('logout', () => {
    handleLogout(io, socket)
  })
  socket.on('get all client', async (body: any) => {
    const token = body.token
    protectedRoute(io, socket, token)
      .then(() => {
        handleGetAllClient(io, socket)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  })
  //chat routes
  socket.on('send message', (body: any) => {
    console.log('receive: ', body)
    io.emit('message', body)
  })
})

// TODO: move this to a test file
/*
const testClient = async () => {
  console.log('test client model and connection')

  const randomNumber = Math.floor(Math.random() * 10000000000)
  const newClient = new clientModel({
    username: 'test username' + randomNumber,
    password: 'test password',
    nickname: 'test nickname',
    socketId: randomNumber,
    groupId: [new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId()],
    status: ClientStatus.AVAILABLE,
    isInvisibility: false,
  })

  await newClient.save()
  const result = await clientModel.find().exec()

  console.log('saved find result : ', result)
}

const testChatData = async () => {
  console.log('test chatData model and connection')

  const newChatData = new chatDataModel({
    text: 'test text',
    senderId: new Types.ObjectId(),
    receiverId: new Types.ObjectId(),
    groupId: new Types.ObjectId(),
  })

  await newChatData.save()
  const result = await chatDataModel.find().exec()

  console.log('saved find result : ', result)
}

const testGroup = async () => {
  console.log('test group model and connection')

  const newGroup = new groupModel({
    groupName: 'test group name ',
    clientId: [new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId()],
  })

  await newGroup.save()
  const result = await groupModel.find().exec()

  console.log('saved find result : ', result)
}

try {
  testClient()
  testChatData()
  testGroup()
} catch (error) {
  console.log('error: ', error)
}
*/

const port = process.env.port || 8000
server.listen(port, () => console.log(`Listening on port:${port}...`))
