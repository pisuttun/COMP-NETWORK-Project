import { TextField, styled } from '@mui/material'
import { typography } from '@mui/system'

export const RootContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #322036;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  /* Add scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px; // Adjust width as desired
  }

  &::-webkit-scrollbar-track {
    background-color: #412846; // Adjust track color as desired
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d0b1f8; // Adjust thumb color as desired
    border-radius: 8px; // Adjust border-radius as desired
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #d0b1f8; // Adjust thumb color on hover as desired
  }
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
