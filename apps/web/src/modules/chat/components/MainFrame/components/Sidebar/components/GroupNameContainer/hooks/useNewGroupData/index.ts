import { useState } from 'react'

const useNewGroupData = () => {
  const [newGroupName, setNewGroupName] = useState<string>('')
  return { newGroupName, setNewGroupName }
}
export default useNewGroupData
