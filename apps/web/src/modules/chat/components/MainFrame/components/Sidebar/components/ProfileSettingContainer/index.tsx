import React from 'react'
import { NewTextField, RootContainer } from './styled'
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
} from '@mui/material'
import { Check } from '@mui/icons-material'
import theme from 'common/config/theme'
import useProfileSetting from './hooks/useProfileSetting'

const ProfileSettingContainer = () => {
  const { value, setValue, newDisplay, setNewDisplay, changeDisplayName } = useProfileSetting()

  return (
    <RootContainer>
      <FormControl component="fieldset" sx={{ gap: '5px' }}>
        <Typography sx={{ color: '#EFE0FF' }}>Change display status</Typography>
        <RadioGroup
          aria-label="options"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          sx={{ gap: '5px' }}
        >
          <FormControlLabel
            value="auto"
            control={<Radio sx={{ color: '#D0B1F8', '&.Mui-checked': { color: '#D0B1F8' } }} />}
            label="auto"
            sx={{ color: '#EFE0FF', height: '3vh' }}
          />
          <FormControlLabel
            value="offline"
            control={<Radio sx={{ color: '#D0B1F8', '&.Mui-checked': { color: '#D0B1F8' } }} />}
            label="offline"
            sx={{ color: '#EFE0FF', height: '3vh' }}
          />
        </RadioGroup>
      </FormControl>
      <Typography sx={{ color: '#EFE0FF', marginTop: '15px' }}>Change display name</Typography>
      <NewTextField
        label="New name"
        value={newDisplay}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <Check
              onClick={() => {
                changeDisplayName()
              }}
              style={{ cursor: 'pointer' }}
            />
          ),
        }}
        style={{
          backgroundColor: theme.palette.primary.light,
          borderRadius: '4px',
          width: '80%',
          marginTop: '5px',
        }}
        onChange={(e) => {
          setNewDisplay(e.target.value)
        }}
        variant="filled"
      />
    </RootContainer>
  )
}
export default ProfileSettingContainer
