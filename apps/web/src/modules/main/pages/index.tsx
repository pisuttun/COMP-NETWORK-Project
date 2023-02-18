import React, { useEffect, useState } from 'react'
import { useSocket } from 'common/context/socketContext'
import { Message } from './types'

export default function Home() {
  const [text, setText] = useState('')
  const [id, setId] = useState('')
  const [message, setMessage] = useState<Message[]>([])
  const { socket } = useSocket()

  useEffect(() => {
    socket.emit('login')
  }, [])

  const handlepost = () => {
    const body: Message = {
      message: text,
      sender: id,
    }
    socket.emit('send message', body)
  }

  socket.on('your id', (data) => {
    setId(data)
  })
  socket.on('message', (data: Message) => {
    setMessage([...message, data])
  })
  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={handlepost}>Send massage </button>
      <p>id: {id}</p>
      <p>message:</p>
      {message.map((p, index) => (
        <li key={index}>
          {p.message} from: {p.sender}
        </li>
      ))}
    </div>
  )
}
