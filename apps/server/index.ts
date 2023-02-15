import express from 'express'
import https from 'https'
import http from 'http'
import { Server, Socket } from 'socket.io'
import fs from 'fs'
import cors from 'cors'
import dotenv from 'dotenv'
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
})
const port = 8000
server.listen(port, () => console.log(`Listening on port:${port}...`))
