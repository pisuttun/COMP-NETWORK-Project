import { Typography } from '@mui/material'
import { RootContainer, SubContainer, StyledReactMarkdown } from './styled'
import { ChatLineProps } from './types'

export default function ChatLine(props: ChatLineProps) {
  const { sender, time, message } = props

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Intl.DateTimeFormat('en-GB', options).format(date)
  }
  return (
    <RootContainer>
      <SubContainer>
        <Typography variant="subtitle2" sx={{ color: '#D0B1F8' }}>
          {sender}
        </Typography>
        <Typography variant="caption" sx={{ color: '#D0B1F8', paddingLeft: '6px' }}>
          {formatDate(new Date(time))}
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
