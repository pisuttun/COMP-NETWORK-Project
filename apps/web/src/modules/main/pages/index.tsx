import React from 'react'
import Typography from '@mui/material/Typography'
import theme from 'common/config/theme'
import { BoxContainer, RootContainer } from './styled'
import TextField from 'common/components/TextField'
import PasswordTextField from 'common/components/PasswordTextField'
import { Button, Link } from '@mui/material'

export default function MainPage() {
  return(
    <RootContainer>
        <Typography variant="h3" 
          sx={{ color: theme.palette.primary.light, textAlign: 'center' }}>ChatIP</Typography>
        <BoxContainer>
          <Typography variant="h5" 
            sx={{ color: theme.palette.common.white, textAlign: 'center' }}>Login</Typography>
          <TextField
            label="username" 
            InputProps={{ 
              disableUnderline: true, 
            }}
          />
          <PasswordTextField
            InputProps={{ 
              disableUnderline: true, 
            }}
          />
          <Button sx={{ 
            borderRadius: '12px',
            color: theme.palette.primary.main, 
            backgroundColor: theme.palette.common.white,
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          type = "submit"
          >
            Login
          </Button>
          <Typography variant="subtitle2" sx={{ color: theme.palette.primary.light, textAlign: 'center' }}>
            do not have an account? {' '}
            <Link href="/" sx={{ color: theme.palette.primary.light}}>
              <Typography variant="subtitle1" sx={{ color: theme.palette.primary.light}} component="a">
                Register
              </Typography>
            </Link>
          </Typography>
        </BoxContainer>
    </RootContainer>
  )
}
