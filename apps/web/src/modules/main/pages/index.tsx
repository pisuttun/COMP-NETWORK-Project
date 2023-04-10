import React from 'react'
import Typography from '@mui/material/Typography'
import theme from 'common/config/theme'
import { BoxContainer, RootContainer } from './styled'
import TextField from 'common/components/TextField'

export default function MainPage() {
  return(
    <RootContainer>
      <div>
        {/* has to div cuz p set default to horizontal layout */}
        <Typography variant="h3" 
          sx={{ color: theme.palette.primary.light }}
          style={{ textAlign: 'center' }}>ChatIP</Typography>
        <BoxContainer>
          <Typography variant="h5" 
            sx={{ color: theme.palette.common.white }}
            style={{ textAlign: 'center' }}>Login</Typography>
          <TextField
            fullWidth 
            label="username" 
            variant="filled"
            //I can't move this to textField index.tsx somehow
            InputProps={{ 
              disableUnderline: true, 
            }}
          />
          <TextField
            fullWidth 
            label="password" 
            variant="filled"
            InputProps={{ 
              disableUnderline: true, 
            }}
          />
        </BoxContainer>
      </div>
    </RootContainer>
  )
}
