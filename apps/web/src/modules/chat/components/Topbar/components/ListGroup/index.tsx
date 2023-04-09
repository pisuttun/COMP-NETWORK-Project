import React from 'react'
import { RootContainer } from './styled'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { PeopleOutlined, GroupsOutlined } from '@mui/icons-material/'

export default function ListGroup() {
  const [chatList, setChatList] = React.useState<string | null>('DM')
  const isDM = chatList === 'DM'

  const handleChatList = (event: React.MouseEvent<HTMLElement>, newChatList: string | null) => {
    setChatList(newChatList)
  }
  return (
    <RootContainer>
      <ToggleButtonGroup
        value={chatList}
        exclusive
        onChange={handleChatList}
        aria-label="text alignment"
        sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', color: 'white' }}
      >
        <ToggleButton value="DM" aria-label="DM">
          <PeopleOutlined sx={{ fill: '#D0B1F8' }} />
        </ToggleButton>
        <ToggleButton value="Group" aria-label="Group">
          <GroupsOutlined sx={{ fill: '#D0B1F8' }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </RootContainer>
  )
}
