import { Circle } from '@mui/icons-material'
import { ChatNameDisplayProps } from './types'
import { Typography } from '@mui/material'
import { ClientStatus } from '@chatAIP/dtos'
import { Add, Remove } from '@mui/icons-material/'
import { useSocket } from 'common/context/socketContext'

export default function ChatNameDisplay(props: ChatNameDisplayProps) {
  const { isGroup, name, status, focus, setFocus, isChoice, id, isJoined, joinGroup, leaveGroup } =
    props
  const joinGroupHandle = () => {
    joinGroup!(id!)
  }
  const leaveGroupHandle = () => {
    leaveGroup!(id!)
  }
  const { socket } = useSocket()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        minHeight: '7vh',
        backgroundColor: focus === id ? '#412846' : '',
        width: '100%',
        paddingLeft: isChoice ? '' : '1.5rem',
        cursor: isChoice ? '' : 'pointer',
        overflow: 'hidden',
      }}
      onClick={() => {
        if (focus && !isChoice) {
          socket.off(id! + ' message')
          setFocus!(id!)
          console.log(id, focus)
        }
      }}
    >
      {!isGroup && (
        <Circle
          sx={{
            fill: status === ClientStatus.AVAILABLE ? '#6DD58C' : '#606060',
            width: '20px',
            height: '20px',
          }}
        />
      )}
      <Typography sx={{ color: '#EFE0FF', flexGrow: '1' }}>{name}</Typography>
      {isGroup &&
        !isChoice &&
        (isJoined ? (
          <Remove
            sx={{ color: '#EFE0FF', marginRight: '1rem' }}
            onClick={(e) => {
              leaveGroupHandle()
              e.preventDefault()
              e.stopPropagation()
            }}
          />
        ) : (
          <Add
            sx={{ color: '#EFE0FF', marginRight: '1rem' }}
            onClick={(e) => {
              joinGroupHandle()
              e.preventDefault()
              e.stopPropagation()
            }}
          />
        ))}
    </div>
  )
}
