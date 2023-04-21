import React from 'react'
import { RootContainer, ToggleButton } from './styled'
import { PeopleOutlined, GroupsOutlined } from '@mui/icons-material/'
import { ListGroupProps } from './types'

export default function ListGroup(props: ListGroupProps) {
  const { isDM, setIsDM } = props

  return (
    <RootContainer>
      <ToggleButton
        onClick={() => {
          setIsDM(true)
        }}
        sx={{ backgroundColor: isDM ? '#d0b1f8' : '' }}
      >
        <PeopleOutlined sx={{ fill: isDM ? '' : '#d0b1f8' }} />
      </ToggleButton>
      <ToggleButton
        onClick={() => {
          setIsDM(false)
        }}
        sx={{ backgroundColor: isDM ? '' : '#d0b1f8' }}
      >
        <GroupsOutlined sx={{ fill: isDM ? '#d0b1f8' : '' }} />
      </ToggleButton>
    </RootContainer>
  )
}
