import { styled } from '@mui/material'
import ReactMarkdown from 'react-markdown'

export const RootContainer = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  gap: 0;
`
export const SubContainer = styled('div')`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
`
export const StyledReactMarkdown = styled(ReactMarkdown)`
  && * {
    margin: 0;
    padding: 0;
  }
`
