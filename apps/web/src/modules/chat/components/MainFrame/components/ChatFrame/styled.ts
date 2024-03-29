import { TextField, styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  justify-content: space-between;
  flex-grow: 1;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
`
export const ChatBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 2rem;
  flex-grow: 1;
`
export const TextInput = styled(TextField)`
  display: flex;
  width: 95%;
  height: auto;
  align-self: center;
  background-color: #d0b1f8;
  margin-bottom: 20px;
  border-radius: 4px;
  padding: 0;
  overflow: hidden;
  resize: none;
`
