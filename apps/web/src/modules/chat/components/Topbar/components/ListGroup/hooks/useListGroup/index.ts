import { useState } from 'react'

const useListGroup = () => {
  const [chatList, setChatList] = useState<string | null>('DM')
  const isDM = chatList === 'DM'

  const handlePeople = () => {
    setChatList('DM')
  }
  const handleGroups = () => {
    setChatList('Group')
  }
  return { chatList, setChatList, isDM, handleGroups, handlePeople }
}
export default useListGroup
