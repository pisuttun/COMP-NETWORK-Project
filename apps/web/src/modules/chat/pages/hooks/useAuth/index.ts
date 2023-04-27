import { useSocket } from 'common/context/socketContext'
import router from 'next/router'

const useAuth = () => {
  const { socket } = useSocket()

  const logout = () => {
    try {
      socket.emit('logout')
      localStorage.clear()
      router.replace('/')
    } catch (err) {
      console.log(err)
    }
  }

  return { logout }
}

export default useAuth
