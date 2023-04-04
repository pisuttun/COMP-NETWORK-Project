import { Server, Socket } from 'socket.io'

const users: string[] = []
export const handleLogin = (io: Server, socket: Socket) => {
  let id = socket.id
  console.log('new user connected')
  io.to(id).emit('your id', socket.id)
  users.push(id)
  console.log('current users: ', users)
}

export const handleDisconnect = (io: Server, socket: Socket) => {
  console.log('user disconnected: ', socket.id)
  users.splice(users.indexOf(socket.id), 1)
  console.log('current users: ', users)
}
