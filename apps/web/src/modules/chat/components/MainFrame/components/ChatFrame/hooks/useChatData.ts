import { useCallback, useRef, useState } from 'react'
import { ChatLineProps } from '../components/ChatLine/types'
import { chatLog } from '../placeholder'

const useChatData = () => {
  const [chat, setChat] = useState<ChatLineProps[]>()
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const pageControl = useRef(0)

  const fetchData = useCallback(async () => {
    try {
      if (pageControl.current <= page) {
        console.log('TTT')
        pageControl.current = page + 1
        const res = chatLog[page]
        console.log(res)
        setChat((prevChat) => {
          if (prevChat) {
            return [...prevChat, ...res]
          } else {
            return [...res]
          }
        })

        setHasMore(5 > page)
        setPage((prev) => prev + 1)
      }
    } catch (err) {
      console.log(err)
    }
  }, [page])
  return { hasMore, fetchData, chat }
}
export default useChatData
