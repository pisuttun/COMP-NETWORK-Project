import { TextField as TextFieldMUI, TextFieldProps, styled } from '@mui/material'
import theme from 'common/config/theme'
import { FC } from 'react'

const StyledTextField = styled(TextFieldMUI)`
  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.palette.primary.light} inset !important;
      border-radius: 12px;
  }
`

const TextField: FC<TextFieldProps> = (props) => {
  return (
    <StyledTextField 
      fullWidth
      variant="filled"
      style={{
        backgroundColor: theme.palette.primary.light,
        borderRadius: '12px',
      }}
      size="small"
      {...props}
      InputProps={{
        ...props.InputProps,
        sx: {
          borderRadius: '12px',
          backgroundColor: theme.palette.primary.light,
          '& ::-ms-reveal': {
            display: 'none',
          },
          '& ::-ms-clear': {
            display: 'none',
          },
          ...props.InputProps?.sx,
        },
      }}
      InputLabelProps={{
        sx: {
          color: theme.palette.common.black,
          ...props.InputLabelProps?.sx,
        },
        ...props.InputLabelProps,
      }}
    />
  )
}

export default TextField
