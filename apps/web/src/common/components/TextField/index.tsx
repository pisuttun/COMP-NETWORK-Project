import { TextField as TextFieldMUI, TextFieldProps } from '@mui/material'
import theme from 'common/config/theme'
import { FC } from 'react'

const TextField: FC<TextFieldProps> = (props) => {
  return (
    <TextFieldMUI 
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