import { Typography } from '@mui/material'
import { RootContainer, SubContainer } from './styled'
import { ChatLineProps } from './types'

export default function ChatLine(props: ChatLineProps) {
  const { sender, time, message } = props
  return (
    <RootContainer>
      <SubContainer>
        <Typography variant="subtitle2" sx={{ color: '#D0B1F8' }}>
          {sender}
        </Typography>
        <Typography variant="caption" sx={{ color: '#D0B1F8', paddingLeft: '6px' }}>
          {time}
        </Typography>
      </SubContainer>
      <Typography variant="subtitle1" sx={{ color: '#EFE0FF' }}>
        {message}
      </Typography>
    </RootContainer>
  )
}
