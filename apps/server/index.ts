import express from 'express'
import https from 'https'
import http from 'http'
import { Server, Socket } from 'socket.io'
import fs from 'fs'
import cors from 'cors'
import dotenv from 'dotenv'
import clientPromise from './clientPromise'
const SocketIO = require('socket.io')

var io: Server
var server: https.Server | http.Server
dotenv.config()
const app = express()
app.use(cors())

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

//TODO: delete this later
const test = async () => {
  const client = await clientPromise
  const collection = client.db('chat').collection('users')

  await collection.insertOne({ name: 'test', time: new Date() })
  const result = await collection.find().toArray()

  console.log(result)
}

const port = process.env.port || 8000
server.listen(port, () => console.log(`Listening on port:${port}...`))
