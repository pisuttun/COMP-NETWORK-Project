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
    key: fs.readFileSync('/etc/ssl/private/apache-selfsigned.key'),
    cert: fs.readFileSync('/etc/ssl/certs/apache-selfsigned.crt'),
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

  socket.on('login', () => {
    let id = socket.id
    console.log('new user connected')
    io.to(id).emit('your id', socket.id)
    users.push(id)
    console.log('current users: ', users)
  })

  socket.on('send message', (body: any) => {
    console.log('receive: ', body)
    io.emit('message', body)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected: ', socket.id)
    users.splice(users.indexOf(socket.id), 1)
    console.log('current users: ', users)
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
