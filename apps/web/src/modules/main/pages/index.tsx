import React from 'react'
import Typography from '@mui/material/Typography'
import theme from 'common/config/theme'
import { BoxContainer, RootContainer, SubmitButton } from './styled'
import TextField from 'common/components/TextField'
import PasswordTextField from 'common/components/PasswordTextField'
import Link from 'next/link'
import useLoginForm from '../hooks/useLoginForm'

const MainPage = () => {
  const {
    username,
    password,
    usernameError,
    passwordError,
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
  } = useLoginForm();

  return(
    <RootContainer onSubmit={handleSubmit} >
        <Typography variant="h3" 
          sx={{ color: theme.palette.primary.light, textAlign: 'center' }}>ChatIP</Typography>
        <BoxContainer>
          <Typography 
            variant="h5" 
            sx={{ color: theme.palette.common.white, textAlign: 'center' }}>Login</Typography>
          <TextField
            label="username"
            value={username}
            onChange={handleUsernameChange}
            error={usernameError !== ''}
            helperText={usernameError}
            InputProps={{ 
              disableUnderline: true, 
            }}
          />
          <PasswordTextField
            label="password"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError !== ''}
            helperText={passwordError}
            InputProps={{ 
              disableUnderline: true, 
            }}
          />
          <SubmitButton type = "submit">Login</SubmitButton>
          <div style={{ 
            display:'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            }}>
            <Typography variant="subtitle2" 
              noWrap = {true}
              sx={{ 
                color: theme.palette.primary.light, 
                textAlign: 'center',
                width: '100%',
              }}
            >
            does not have an account?
            </Typography>
            <Link href="/register" passHref style={{ color: theme.palette.primary.light}}>
              <Typography variant="subtitle1" sx={{ color: theme.palette.primary.light}}>
                Register
              </Typography>
            </Link>
          </div>
        </BoxContainer>
    </RootContainer>
  )
}
          
export default MainPage
