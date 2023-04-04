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
import { ClientStatus } from './database/schema/interface'
import { handleDisconnect, handleLogin } from './database/controller/auth'
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
    console.log('verify token', token)
    //TODO: verify token
    //verify()
    const isSuccess = true
    io.to(socket.id).emit('verify status', { isSuccess })
  })

  //auth routes
  socket.on('login', () => {
    handleLogin(io, socket)
  })
  socket.on('disconnect', () => {
    handleDisconnect(io, socket)
  })

  socket.on('send message', (body: any) => {
    console.log('receive: ', body)
    io.emit('message', body)
  })
})

const test = async () => {
  console.log('test model and connection')
  const randomNumberId = Math.floor(Math.random() * 1000000)
  const newClient = new clientModel({
    //todo: change id to auto increment
    id: randomNumberId,
    username: 'test username' + randomNumberId,
    password: 'test password',
    nickname: 'test nickname',
    socketId: '123abc',
    groupId: [1, 2, 3],
    status: ClientStatus.AVAILABLE,
    isInvisibility: false,
  })

  await newClient.save()
  const result = await clientModel.find().exec()

  console.log('saved find result : ', result)
}
/*
try {
  test()
} catch (error) {
  console.log('error: ', error)
}
*/
const port = process.env.port || 8000
server.listen(port, () => console.log(`Listening on port:${port}...`))
