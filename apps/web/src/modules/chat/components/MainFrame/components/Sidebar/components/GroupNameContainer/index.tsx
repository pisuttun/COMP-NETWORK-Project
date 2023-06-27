import ChatNameDisplay from 'modules/chat/components/ChatNameDisplay'
import { GroupNameContainerProps } from './types'
import { RootContainer, NewTextField } from './styled'
import { TextField, Typography } from '@mui/material'
import theme from 'common/config/theme'
import useNewGroupData from './hooks/useNewGroupData'
import { Add } from '@mui/icons-material/'

export default function ChatNameContainer(props: GroupNameContainerProps) {
  const {
    unjoinGroupList,
    joinedGroupList,
    focus,
    setFocus,
    createNewGroup,
    joinGroup,
    leaveGroup,
    isSetting,
  } = props
  const { newGroupName, setNewGroupName } = useNewGroupData()
  return (
    <RootContainer sx={{ height: isSetting ? 'calc(85vh - 240px)' : '85vh' }}>
      <Typography
        variant="subtitle1"
        style={{ color: '#D0B1F8', paddingLeft: '1.5rem', paddingTop: '1rem' }}
      >
        create new group
      </Typography>
      <NewTextField
        label="Group name"
        value={newGroupName}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <Add
              onClick={() => {
                createNewGroup(newGroupName)
              }}
              style={{ cursor: 'pointer' }}
            />
          ),
        }}
        style={{
          marginLeft: '1.5rem',
          marginTop: '1rem',
          backgroundColor: theme.palette.primary.light,
          borderRadius: '4px',
          width: '80%',
        }}
        onChange={(e) => {
          setNewGroupName(e.target.value)
        }}
        variant="filled"
      />
      <Typography
        variant="subtitle1"
        style={{ color: '#D0B1F8', paddingLeft: '1.5rem', paddingTop: '1rem' }}
      >
        Joined groups
      </Typography>
      {joinedGroupList &&
        joinedGroupList?.map((item) => {
          return (
            <ChatNameDisplay
              key={item.groupId}
              isGroup={true}
              name={item.groupName}
              focus={focus}
              setFocus={setFocus}
              isJoined={true}
              id={item.groupId}
              leaveGroup={leaveGroup}
            />
          )
        })}
      <Typography
        variant="subtitle1"
        style={{ color: '#D0B1F8', paddingLeft: '1.5rem', paddingTop: '1rem' }}
      >
        Other groups
      </Typography>
      {unjoinGroupList &&
        unjoinGroupList?.map((item) => {
          return (
            <ChatNameDisplay
              key={item.groupId}
              isGroup={true}
              name={item.groupName}
              isJoined={false}
              id={item.groupId}
              joinGroup={joinGroup}
            />
          )
        })}
    </RootContainer>
  )
}
