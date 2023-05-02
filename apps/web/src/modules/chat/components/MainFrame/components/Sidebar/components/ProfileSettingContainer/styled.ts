import { TextField, styled } from '@mui/material'

export const RootContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 240px;
  padding: 18px;
  background-color: #1d121f;
`
export const NewTextField = styled(TextField)`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.palette.primary.light} inset !important;
    border-radius: 12px;
  }
`
