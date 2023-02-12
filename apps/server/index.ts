import express from 'express'
import * as http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const users: string[] = []
io.on('connection', (socket) => {
  socket.on('login', () => {
    let id = socket.id
    console.log('new user connected')
    io.to(id).emit('your id', socket.id)
    users.push(id)
    console.log('current users: ', users)
  })

  socket.on('send message', (body) => {
    console.log('receive: ', body)
    io.emit('message', body)
  })
})
const port = 8000
server.listen(port, () => console.log(`Listening on port:${port}...`))
