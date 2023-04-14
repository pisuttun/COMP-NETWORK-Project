import { useCallback, useRef, useState } from 'react'
import { ChatLineProps } from '../components/ChatLine/types'
import { chatLog } from '../placeholder'

const useChatData = () => {
  const [chat, setChat] = useState<ChatLineProps[]>(chatLog[0])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const pageControl = useRef(1)

  const fetchData = useCallback(async () => {
    try {
      if (pageControl.current <= page && hasMore) {
        pageControl.current = page + 1
        const res = chatLog[page]
        setChat((prevChat) => {
          if (prevChat) {
            return [...prevChat, ...res]
          } else {
            return [...res]
          }
        })

        setHasMore(3 > page)
        setPage((prev) => prev + 1)
      }
    } catch (err) {
      console.log(err)
    }
  }, [hasMore, page])
  return { hasMore, fetchData, chat }
}
export default useChatData
