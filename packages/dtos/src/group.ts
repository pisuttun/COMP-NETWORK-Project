export interface CreateGroupDto {
  groupName: string
  clientId: string
}

export interface GroupInfoDto {
  groupId: string
  groupName: string
  isJoined: Boolean
}

export interface GroupClientIdDto {
  groupId: string
  clientId: string
}
