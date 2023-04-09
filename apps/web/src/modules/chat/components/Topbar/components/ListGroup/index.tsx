import React, { useRef, useEffect } from 'react'
import { RootContainer, ToggleButton } from './styled'
import { PeopleOutlined, GroupsOutlined } from '@mui/icons-material/'
import useListGroup from './hooks/useListGroup'

export default function ListGroup() {
  const { isDM, handlePeople, handleGroups } = useListGroup()

  return (
    <RootContainer>
      <ToggleButton onClick={handlePeople} sx={{ backgroundColor: isDM ? '#d0b1f8' : '' }}>
        <PeopleOutlined sx={{ fill: isDM ? '' : '#d0b1f8' }} />
      </ToggleButton>
      <ToggleButton onClick={handleGroups} sx={{ backgroundColor: isDM ? '' : '#d0b1f8' }}>
        <GroupsOutlined sx={{ fill: isDM ? '#d0b1f8' : '' }} />
      </ToggleButton>
    </RootContainer>
  )
}
