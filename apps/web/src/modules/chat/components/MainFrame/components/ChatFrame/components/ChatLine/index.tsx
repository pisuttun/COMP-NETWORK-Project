import { Typography } from '@mui/material'
import { RootContainer, SubContainer, StyledReactMarkdown } from './styled'
import { ChatLineProps } from './types'

export default function ChatLine(props: ChatLineProps) {
  const { sender, time, message } = props
  console.log('RECEIVE : ', time)
  return (
    <RootContainer>
      <SubContainer>
        <Typography variant="subtitle2" sx={{ color: '#D0B1F8' }}>
          {sender}
        </Typography>
        <Typography variant="caption" sx={{ color: '#D0B1F8', paddingLeft: '6px' }}>
          {new Date(time).toLocaleTimeString()}
        </Typography>
      </SubContainer>
      <Typography
        variant="subtitle1"
        sx={{ color: '#EFE0FF', wordWrap: 'break-word', maxWidth: '70vw', padding: '0' }}
      >
        <StyledReactMarkdown>{message}</StyledReactMarkdown>
      </Typography>
    </RootContainer>
  )
}
