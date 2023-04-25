/* eslint-disable turbo/no-undeclared-env-vars */
import express from 'express'
import https from 'https'
import http from 'http'
import { Server, Socket } from 'socket.io'
import fs from 'fs'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDatabase from './database/dbConnect'
import { GroupClientIdDto, UpdateClientInfoDto } from '@chatAIP/dtos'
import {
  handleDisconnect,
  handleLogin,
  handleRegister,
  handleVerify,
  handleLogout,
} from './controllers/auth'
import { handleGetAllClient, handleUpdateClientInfo } from './controllers/profiles'
import { protectedRoute } from './middleware/auth'
import { handleSendMessage } from './controllers/messages'
import messageRoute from './routes/messages'
import { CreateGroupDto, SendMessageDto, UserCredentialsDto, VerifyTokenDto } from '@chatAIP/dtos'
import {
  handleCreateGroup,
  handleGetAllGroup,
  handleJoinGroup,
  handleLeaveGroup,
} from './controllers/groups'
const SocketIO = require('socket.io')

var io: Server
var server: https.Server | http.Server
dotenv.config()
const app = express()

// Body parser
app.use(express.json())

// Enable CORS
app.use(cors())

//routes
app.use('/api/messages', messageRoute)
app.get('/', (req, res) => {
  res.send('hello from express')
})

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
console.log('server', typeof server)

const users: string[] = []
io.on('connection', (socket: Socket) => {
  console.log('new socket connection: ', socket.id)
  //verify the token
  socket.on('verify token', (body: VerifyTokenDto) => {
    const token = body.token
    handleVerify(io, socket, token)
  })

  //auth routes
  socket.on('register', (body: UserCredentialsDto) => {
    handleRegister(io, socket, body)
  })
  socket.on('login', (body: UserCredentialsDto) => {
    handleLogin(io, socket, body)
  })
  socket.on('disconnect', () => {
    // disconnect is socket.io disconnect event
    handleDisconnect(io, socket)
  })
  socket.on('logout', async () => {
    // logout is custom user client logout event
    protectedRoute(io, socket)
      .then((result) => {
        //console.log('before logout result: ', result)
        handleLogout(io, socket, String(result._id))
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  })

  //profile routes
  socket.on('change client info', async (body: UpdateClientInfoDto) => {
    protectedRoute(io, socket)
      .then(() => {
        handleUpdateClientInfo(io, socket, body)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  })
  socket.on('get all client', async () => {
    protectedRoute(io, socket)
      .then(() => {
        handleGetAllClient(io, socket)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  })

  //message routes
  socket.on('send message', (body: SendMessageDto) => {
    protectedRoute(io, socket)
      .then(() => {
        handleSendMessage(io, socket, body)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  })

  //group routes
  socket.on('create group', (body: CreateGroupDto) => {
    protectedRoute(io, socket)
      .then(() => {
        handleCreateGroup(io, socket, body)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  })
  socket.on('get all group', () => {
    protectedRoute(io, socket)
      .then(() => {
        handleGetAllGroup(io, socket)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  })
  socket.on('join group', (body: GroupClientIdDto) => {
    protectedRoute(io, socket)
      .then(() => {
        handleJoinGroup(io, socket, body)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  })
  socket.on('leave group', (body: GroupClientIdDto) => {
    protectedRoute(io, socket)
      .then(() => {
        handleLeaveGroup(io, socket, body)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  })
})

const port = process.env.port || 8000
server.listen(port, () => console.log(`Listening on port:${port}...`))
