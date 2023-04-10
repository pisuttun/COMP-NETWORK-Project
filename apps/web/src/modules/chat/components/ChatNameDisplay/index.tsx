import { Circle } from '@mui/icons-material'
import { ChatNameDisplayProps } from './types'
import { Typography } from '@mui/material'

export default function ChatNameDisplay(props: ChatNameDisplayProps) {
  const { isGroup, name, isOnline } = props
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        height: '7vh',
      }}
    >
      {!isGroup && <Circle sx={{ fill: isOnline ? '#6DD58C' : '#606060' }} />}
      <Typography sx={{ color: '#EFE0FF' }}>{name}</Typography>
    </div>
  )
}
