import { Circle } from '@mui/icons-material'
import { ChatNameDisplayProps } from './types'
import { Typography } from '@mui/material'
import { ClientStatus } from '@chatAIP/dtos'

export default function ChatNameDisplay(props: ChatNameDisplayProps) {
  const { isGroup, name, status } = props
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        minHeight: '7vh',
      }}
    >
      {!isGroup && (
        <Circle sx={{ fill: status === ClientStatus.AVAILABLE ? '#6DD58C' : '#606060' }} />
      )}
      <Typography sx={{ color: '#EFE0FF' }}>{name}</Typography>
    </div>
  )
}
